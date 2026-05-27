import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Edit, GripVertical, ImagePlus, Save, Trash2, Upload } from 'lucide-react';
import { api } from '../../api';
import { formatDate, PageHeader, Pagination } from './AdminHelpers';
import { useToast } from '../../components/Toast'; // Adjust path as needed

const emptyProduct = {
  name: '',
  composition: '',
  formulation: '',
  status: '',
  description: '',
  packing_size: '',
  featured: false,
  division: '',
  product_category: '',
  product_chemical_category: '',
};

export default function AdminProducts() {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chemicalCategories, setChemicalCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [images, setImages] = useState([]);
  const [draggingImageId, setDraggingImageId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const params = useMemo(() => ({ page, page_size: 10, search }), [page, search]);

  const load = () => api.adminProducts(params).then((data) => {
    setRows(data.results);
    setMeta(data);
  });

  useEffect(() => {
    Promise.all([
      api.adminDivisions({ page_size: 100 }),
      api.adminCategories({ page_size: 100 }),
      api.adminChemicalCategories({ page_size: 100 }),
    ]).then(([divisionData, categoryData, chemicalCategoryData]) => {
      setDivisions(divisionData.results);
      setCategories(categoryData.results);
      setChemicalCategories(chemicalCategoryData.results);
    }).catch((err) => {
      toast.error('Failed to load product form options');
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      load().catch((err) => {
        setError(err.message);
        toast.error(err.message || 'Failed to load products');
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [params]);

  const openForm = (row = null) => {
    setEditing(row || {});
    setImages(row?.images || []);
    setForm(row ? {
      name: row.name || '',
      composition: row.composition || '',
      formulation: row.formulation || '',
      status: row.status || '',
      description: row.description || '',
      packing_size: row.packing_size || '',
      featured: Boolean(row.featured),
      division: row.division || '',
      product_category: row.product_category || '',
      product_chemical_category: row.product_chemical_category || '',
    } : emptyProduct);
    setActiveTab('details');
    setError('');
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const save = async (event) => {
    event.preventDefault();
    try {
      if (editing.id) {
        const updated = await api.updateProduct(editing.id, form);
        setEditing(updated);
        setImages(updated.images || []);
        toast.success('✓ Product updated successfully!');
      } else {
        const created = await api.createProduct(form);
        setEditing(created);
        setImages(created.images || []);
        setActiveTab('images');
        toast.success('✓ Product created successfully!');
      }
      await load();
      setError('');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to save product');
    }
  };

  const uploadImages = async (event) => {
    const files = event.target.files;
    if (!editing?.id || !files?.length) return;
    setUploading(true);
    try {
      const data = await api.uploadProductImages(editing.id, files);
      setImages((current) => [...current, ...data.results]);
      await load();
      const count = files.length;
      toast.success(`✓ ${count} image${count > 1 ? 's' : ''} uploaded successfully!`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to upload images');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const deleteImage = async (image) => {
    if (!window.confirm(`Delete image "${image.file_name}"?`)) return;
    try {
      await api.deleteProductImage(image.id);
      setImages((current) => current.filter((item) => item.id !== image.id).map((item, index) => ({ ...item, order_no: index + 1 })));
      await load();
      toast.success('✓ Image deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete image');
    }
  };

  const moveImage = async (targetImageId) => {
    if (!draggingImageId || draggingImageId === targetImageId) return;
    const fromIndex = images.findIndex((image) => image.id === draggingImageId);
    const toIndex = images.findIndex((image) => image.id === targetImageId);
    if (fromIndex < 0 || toIndex < 0) return;

    const next = [...images];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const normalized = next.map((image, index) => ({ ...image, order_no: index + 1 }));
    setImages(normalized);
    setDraggingImageId(null);

    try {
      const data = await api.reorderProductImages(editing.id, normalized.map((image) => image.id));
      setImages(data.results);
      await load();
      toast.success('✓ Image order updated!');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to reorder images');
      // Revert on error
      setImages(images);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete product "${row.name}"?`)) return;
    try {
      await api.deleteProduct(row.id);
      await load();
      toast.success(`✓ Product "${row.name}" deleted successfully!`);
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    }
  };

  // Show full-screen editor when editing
  if (editing) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditing(null)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    {editing.id ? `Edit: ${editing.name || 'Product'}` : 'New Product'}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    {editing.id ? 'Update product details and manage images' : 'Create a new product'}
                  </p>
                </div>
              </div>
              {editing.id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                      activeTab === 'details'
                        ? 'bg-teal text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab('images')}
                    className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                      activeTab === 'images'
                        ? 'bg-teal text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Images ({images.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-6 py-8">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {activeTab === 'details' && (
            <form onSubmit={save} className="space-y-6">
              {/* Basic Information */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-slate-900">Basic Information</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Product Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="e.g., Paracetamol"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Formulation</span>
                    <input
                      value={form.formulation}
                      onChange={(event) => updateField('formulation', event.target.value)}
                      placeholder="e.g., Tablet, Syrup, Injection"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Division</span>
                    <select
                      value={form.division}
                      onChange={(event) => updateField('division', event.target.value)}
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    >
                      <option value="">Select division</option>
                      {divisions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Product Category</span>
                    <select
                      value={form.product_category}
                      onChange={(event) => updateField('product_category', event.target.value)}
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Product Chemical Category</span>
                    <select
                      value={form.product_chemical_category}
                      onChange={(event) => updateField('product_chemical_category', event.target.value)}
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    >
                      <option value="">Select chemical category</option>
                      {chemicalCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(event) => updateField('featured', event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal"
                    />
                    <span className="text-sm font-bold text-slate-700">Featured product</span>
                  </label>
                </div>
              </div>

              {/* Additional Details */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-slate-900">Additional Details</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Status</span>
                    <input
                      value={form.status}
                      onChange={(event) => updateField('status', event.target.value)}
                      placeholder="e.g., Prescription drugs only"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Packing Size</span>
                    <input
                      value={form.packing_size}
                      onChange={(event) => updateField('packing_size', event.target.value)}
                      placeholder="e.g., 50*2*10 Blister pack"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                </div>
              </div>

              {/* Composition & Description */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h2 className="mb-5 text-lg font-black text-slate-900">Composition & Description</h2>
                <div className="space-y-5">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Composition</span>
                    <textarea
                      rows={4}
                      value={form.composition}
                      onChange={(event) => updateField('composition', event.target.value)}
                      placeholder="Enter the chemical composition or ingredients"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-slate-700">Description</span>
                    <textarea
                      rows={6}
                      value={form.description}
                      onChange={(event) => updateField('description', event.target.value)}
                      placeholder="Enter a detailed description of the product"
                      className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-black text-white hover:bg-teal/90"
                >
                  <Save size={18} />
                  {editing.id ? 'Update Product' : 'Create Product'}
                </button>
                {!editing.id && (
                  <p className="text-sm text-slate-500">
                    Save the product first to upload images
                  </p>
                )}
              </div>
            </form>
          )}

          {activeTab === 'images' && editing.id && (
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Product Images</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Upload and manage product images. Drag to reorder.
                    </p>
                  </div>
                  <label className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-black text-white transition-colors ${
                    uploading ? 'cursor-wait bg-slate-400' : 'cursor-pointer bg-teal hover:bg-teal/90'
                  }`}>
                    <Upload size={18} />
                    {uploading ? 'Uploading...' : 'Upload Images'}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      disabled={uploading}
                      onChange={uploadImages}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    draggable
                    onDragStart={() => setDraggingImageId(image.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => moveImage(image.id)}
                    className="group overflow-hidden rounded-lg border-2 border-slate-200 bg-white transition-all hover:border-teal hover:shadow-lg"
                  >
                    <div className="relative aspect-video bg-slate-100">
                      <img
                        src={image.url}
                        alt={image.file_name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <span className="rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-black text-white">
                          #{image.order_no}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteImage(image)}
                        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 p-3">
                      <GripVertical size={18} className="shrink-0 text-slate-400" />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-600">
                        {image.file_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {!images.length && (
                <div className="grid min-h-96 place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-white">
                  <div className="text-center">
                    <ImagePlus className="mx-auto mb-3 text-slate-300" size={48} />
                    <p className="text-lg font-bold text-slate-400">No images uploaded yet</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Click "Upload Images" to add product photos
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main product list view
  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Create and manage backend product records."
        onAdd={() => openForm()}
        addLabel="Add Product"
      />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 sm:max-w-md"
        />
      </div>
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}
      <div className="mt-8 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Division</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Chemical</th>
              <th className="px-5 py-4">Featured</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-bold text-slate-900">{row.name}</td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {row.division_name || '-'}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {row.product_category_name || '-'}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {row.product_chemical_category_name || '-'}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {row.featured ? 'Yes' : '-'}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{row.status || '-'}</td>
                <td className="px-5 py-4 text-sm text-slate-500">
                  {formatDate(row.created_at)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openForm(row)}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => remove(row)}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination meta={meta} onPage={setPage} />
    </div>
  );
}
