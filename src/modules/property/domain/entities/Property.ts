import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Property {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'varchar'})
  name: string

  @Column({type: 'varchar'})
  code: string
}