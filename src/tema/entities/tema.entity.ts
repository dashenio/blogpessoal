import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'tb_temas'}) // CREATE TABLE tb_postagens
export class Tema{

    @ApiProperty()
    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    @ApiProperty()
    @Transform(({ value } : TransformFnParams) => value?.trim()) // Remove espaços em branco início/fim
    @IsNotEmpty() // Força digitação
    @Length(10, 255, {message: 'O texto deve ter entre 10 e 255 caracteres'})
    @Column({length: 255, nullable: false}) // VARCHAR(255) NOT NULL
    descricao: string;

    @ApiProperty()
    @OneToMany( () => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; //array de retorno

}