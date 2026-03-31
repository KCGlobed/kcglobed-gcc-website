# Payment API Documentation (Cashfree)

This document describes the payment API endpoints for the KCGlobed GCC Website using the **Cashfree** gateway.

---

## 1. Start Payment
**Endpoint:** `POST /api/start-payment`  
**Description:** Initiates a payment session with Cashfree and returns the necessary order details for the frontend SDK.

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Name of the customer |
| `email` | String | Yes | Email address of the customer |
| `mobile` | String | Yes | Mobile number of the customer |
| `city` | String | Yes | City of the customer |
| `state` | String | Yes | State of the customer |
| `form_type` | String/Number | Yes | Type of form (e.g., dossier, application) |
| `form_id` | String/Number | Yes | ID of the associated form record |
| `user_id` | String | No | ID of the logged-in user |
| `payment_type`| String | No | Use `'reattempt'` to apply dynamic discounts if configured |

### Response Sample
```json
{
  "success": true,
  "gateway": "cashfree",
  "cf_order_id": "cf_123_1711888492",
  "payment_session_id": "session_...",
  "amount": 2950,
  "currency": "INR",
  "environment": "SANDBOX"
}
```

---

## 2. Complete Payment
**Endpoint:** `POST /api/complete-payment`  
**Description:** Verifies the payment status with Cashfree and records the successful transaction in the database.

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `cf_order_id` | String | Yes | The Order ID returned by the Cashfree SDK |
| `re_attempt_status` | Boolean | No | Indicates if this was a reattempt (default: `false`) |

### Response Sample
```json
{
  "success": true,
  "message": "Payment verified and saved successfully",
  "payment_id": 789
}
```

---

## 3. Report Payment Failure
**Endpoint:** `POST /api/report-payment-failure`  
**Description:** Notifies the server of a failed payment attempt. This records the failure for analytics and sends a recovery email to the customer.

### Request Body
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `cf_order_id` | String | Yes | The Cashfree Order ID (can also use `order_id`) |
| `cf_payment_id`| String | No | The Payment ID if available |
| `re_attempt_status`| Boolean | No | Indicates if this was a reattempt |
| `error_code` | String | No | Cashfree specific error code |
| `error_description`| String | No | Human readable error description |

### Response Sample
```json
{
  "success": true,
  "message": "Failure recorded"
}
```

---

## Error Responses
Standard error response format:
```json
{
  "success": false,
  "message": "Detailed error message here"
}
```
Common Status Codes:
- `400 Bad Request`: Missing required fields (e.g., `cf_order_id`).
- `500 Internal Server Error`: Cashfree communication failure or database error.
