import { SlidersHorizontal } from 'lucide-react';

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Plants', value: 'Plantae' },
  { label: 'Birds', value: 'Aves' },
  { label: 'Mammals', value: 'Mammalia' },
  { label: 'Insects', value: 'Insecta' },
  { label: 'Amphibians', value: 'Amphibia' },
  { label: 'Reptiles', value: 'Reptilia' },
  { label: 'Fungi', value: 'Fungi' },
];

function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter">
      <SlidersHorizontal size={18} />

      <label htmlFor="category-select">
        Category:
      </label>

      <select
        id="category-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
