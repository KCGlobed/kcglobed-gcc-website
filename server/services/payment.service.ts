import { pool } from '../utils/db';

export async function savePayment(data: any) {
    const query = `
    INSERT INTO payments (
      user_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      status,
      response
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8
    )
    RETURNING id
  `;

    const values = [
        data.user_id,
        data.razorpay_order_id,
        data.razorpay_payment_id,
        data.razorpay_signature,
        data.amount,
        data.currency || 'INR',
        data.status || 'success',
        data.response
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
}
