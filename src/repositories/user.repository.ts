import { getDb } from '../config/db';
import { CreateUserInput, UpdateUserInput } from '../models/userModel';
import { IUser } from '../interfaces/IUser';

function mapRowToUser(row: any): IUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM users ORDER BY id DESC;');
    return rows.map(mapRowToUser);
  }

  public async findById(id: number): Promise<IUser | null> {
    const db = await getDb();
    const row = await db.get('SELECT * FROM users WHERE id = ?;', id);
    return row ? mapRowToUser(row) : null;
  }

  public async create(input: CreateUserInput): Promise<IUser> {
    const db = await getDb();
    const now = new Date().toISOString();

    const result = await db.run(
      `INSERT INTO users (name, email, password, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?);`,
      input.name,
      input.email,
      input.password,
      now,
      now
    );

    const created = await this.findById(Number(result.lastID));
    if (!created) throw new Error('Failed to create user');
    return created;
  }

  public async update(id: number, input: UpdateUserInput): Promise<IUser | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const db = await getDb();
    const now = new Date().toISOString();

    const next = {
      name: input.name ?? existing.name,
      email: input.email ?? existing.email,
      password: input.password ?? existing.password,
    };

    await db.run(
      `UPDATE users
       SET name = ?, email = ?, password = ?, updated_at = ?
       WHERE id = ?;`,
      next.name,
      next.email,
      next.password,
      now,
      id
    );

    return this.findById(id);
  }

  public async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM users WHERE id = ?;', id);
    return (result.changes ?? 0) > 0;
  }
}

export default UserRepository;

