import { pool } from '../utils/db';

export async function saveUser(data: any) {
  data.ug_cgpa = data.ug_cgpa || 0;
  data.cgpa = data.cgpa || 0;
  console.log("data", data)
  const query = `
    INSERT INTO students_data (
      first_name, last_name,
      father_name, father_mobile, father_email, father_occupation,
      mother_name, mother_mobile, mother_email, mother_occupation,
      dob, gender, nationality,
      email, mobile, city, state, pin_code,
      class10_year, class10_score,
      class12_year, class12_score,
      medium_of_instruction, medium_other,
      ug_status, first_division, ug_cgpa, ug_institution,
      pg_exists, pg_type, pg_other, pg_institution,
      highest_qualification, university, semester, cgpa, graduation_year,
      work_experience
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,
      $7,$8,$9,$10,
      $11,$12,$13,
      $14,$15,$16,$17,$18,
      $19,$20,$21,$22,$23,
      $24,$25,$26,$27,$28,
      $29,$30,$31,$32,$33,
      $34,$35,$36,$37,$38
    )
    RETURNING id
  `

  const values = [
    data.first_name,
    data.last_name,

    data.father_name,
    data.father_mobile,
    data.father_email,
    data.father_occupation,

    data.mother_name,
    data.mother_mobile,
    data.mother_email,
    data.mother_occupation,

    data.dob,
    data.gender,
    data.nationality || 'Indian',

    data.email,
    data.mobile,
    data.city,
    data.state,
    data.pin_code,

    data.class10_year,
    data.class10_score,
    data.class12_year,
    data.class12_score,
    data.medium_of_instruction,
    data.medium_other,
    data.ug_status,
    data.first_division,
    data.ug_cgpa || 0,
    data.ug_institution,
    data.pg_exists,
    data.pg_type,
    data.pg_other,
    data.pg_institution,
    data.highest_qualification,
    data.university,
    data.semester,
    data.cgpa || 0,
    data.graduation_year,

    JSON.stringify(data.work_experience || [])
  ]

  const result = await pool.query(query, values)
  return result.rows[0].id;
}
