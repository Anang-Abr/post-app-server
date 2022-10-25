import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;
}
