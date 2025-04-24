import { useEffect, useState } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    await createProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
    });
    setForm({ name: '', description: '', price: '' });
    loadProducts();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📦 Lista de Produtos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{product.name}</strong> - R$ {product.price.toFixed(2)}
              <br />
              <small>{product.description}</small>
              <br />
              <button onClick={() => handleDelete(product.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
