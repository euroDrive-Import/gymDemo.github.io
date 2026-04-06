/**
 * WooCommerce Service - Production Ready
 * This service handles communication with the WooCommerce REST API.
 * Configured to be used with Environment Variables for security.
 */

const API_CONFIG = {
    // Replace with your real WooCommerce domain (e.g., https://tutienda.com)
    url: import.meta.env.VITE_WOO_URL || 'https://lapaulettefitness.com', 
    consumerKey: import.meta.env.VITE_WOO_KEY || '', 
    consumerSecret: import.meta.env.VITE_WOO_SECRET || '',
    version: 'wc/v3'
};

// Authentication using Basic Auth (standard for WooCommerce over HTTPS)
const getAuthHeaders = () => {
    if (!API_CONFIG.consumerKey || !API_CONFIG.consumerSecret) return {};
    const b64 = btoa(`${API_CONFIG.consumerKey}:${API_CONFIG.consumerSecret}`);
    return { 'Authorization': `Basic ${b64}` };
};

/**
 * Fetch all active products from WooCommerce
 */
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_CONFIG.url}/wp-json/${API_CONFIG.version}/products?status=publish&per_page=20`, {
            headers: getAuthHeaders()
        });
        
        if (!response.ok) throw new Error('Error al conectar con WooCommerce');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("WooCommerce Fetch Error:", error);
        // Fallback or handle error
        return [];
    }
};

/**
 * Store order in WooCommerce database
 */
export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_CONFIG.url}/wp-json/${API_CONFIG.version}/orders`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('No se pudo procesar el pedido');
        
        return await response.json();
    } catch (error) {
        console.error("WooCommerce Order Error:", error);
        throw error;
    }
};
