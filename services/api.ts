const API_BASE_URL = 'http://localhost:3000';

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  return res.json();
}

export async function createProduct(product: {
  name: string;
  description?: string;
  price: number;
}) {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}