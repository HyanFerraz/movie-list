import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  country: string;

  @Column()
  studio: string;

  @Column({
    type: 'date',
  })
  release: string;
}
