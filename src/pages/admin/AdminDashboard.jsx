import React, { useEffect, useState } from 'react';
import { Boxes, Grid3X3, PackagePlus } from 'lucide-react';
import { api } from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ divisions: 0, categories: 0, chemicalCategories: 0, products: 0 });

  useEffect(() => {
    Promise.all([
      api.adminDivisions({ page_size: 1 }),
      api.adminCategories({ page_size: 1 }),
      api.adminChemicalCategories({ page_size: 1 }),
      api.adminProducts({ page_size: 1 }),
    ]).then(([divisions, categories, chemicalCategories, products]) => {
      setStats({ divisions: divisions.count, categories: categories.count, chemicalCategories: chemicalCategories.count, products: products.count });
    });
  }, []);

  const cards = [
    { label: 'Divisions', value: stats.divisions, Icon: Boxes },
    { label: 'Product Categories', value: stats.categories, Icon: Grid3X3 },
    { label: 'Chemical Categories', value: stats.chemicalCategories, Icon: Grid3X3 },
    { label: 'Products', value: stats.products, Icon: PackagePlus },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-500">Manage the dynamic Bleen catalogue.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {cards.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-3 text-4xl font-black text-slate-900">{value}</p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-teal-50 text-teal">
                <Icon size={26} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
