import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../../shared/types';

describe('<ProductCard />', () => {
  it('muestra nombre, precio y badge de stock', () => {
    const product: Product = {
      id: 'p1',
      name: 'Guantes GN102',
      price: 59.9,
      isAvailable: true,
      category: 'gloves',
      image: '/img/gn102.jpg',
    };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Guantes GN102')).toBeInTheDocument();
    expect(screen.getByText('$59.90')).toBeInTheDocument();
    expect(screen.getByText('En stock')).toBeInTheDocument();
  });
});
