import { pool } from '../utils/db';

export async function saveUser(data: any) {
    const query = `
    INSERT INTO users (
      first_name, last_name,
      father_name, father_mobile, father_email,
      mother_name, mother_mobile, mother_email,
      dob, gender, nationality,
      email, mobile, city, state, pin_code,
      highest_qualification, university, semester, cgpa, graduation_year,
      work_experience
    )
    VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,
      $9,$10,$11,
      $12,$13,$14,$15,$16,
      $17,$18,$19,$20,$21,
      $22
    )
  `

    const values = [
        data.first_name,
        data.last_name,

        data.father_name,
        data.father_mobile,
        data.father_email,

        data.mother_name,
        data.mother_mobile,
        data.mother_email,

        data.dob,
        data.gender,
        data.nationality || 'Indian',

        data.email,
        data.mobile,
        data.city,
        data.state,
        data.pin_code,

        data.highest_qualification,
        data.university,
        data.semester,
        data.cgpa,
        data.graduation_year,

        JSON.stringify(data.work_experience || [])
    ]

    await pool.query(query, values)
}
