# TypeORM 정리

- 

[TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](https://typeorm.io/)

- 다양한 종류(RDBMS{mariadb, mysql, mssql}, NO-SQL(ORDBMS, OODBMS  등 관계형 DB를 제외한 DB들))을 객체형태로 사용할 수 있게한다.
- 쌩쿼리(SQL Query)를 사용해 API마다 쿼리를 사용할때보다 훨씬 좋은 가독성을 제공한다.
- develop 단계에서는 synchronize옵션(drop schema → create table),
- production(배포) 단계에서는 migration(modify table)을 사용해야한다는 것이 중요함

## 1. entity

- typeorm에서 DB의 table을 지칭하는 용어

### a. model 선언

```tsx
export class Photo {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
}
```

### b. model을 entity로 선언

- typeorm의 **@Entity()** decorator를 사용합니다.

```tsx
import { Entity } from "typeorm"

@Entity()
export class Photo {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
}
```

### c. column 선언

- **@Column** 데코레이터를 사용합니다.

```tsx
import { Entity, Column } from "typeorm"

@Entity()
export class Photo {
    @Column()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean
}
```

### d. column 데이터 타입선언

- @Column 데코레이터에서 수정합니다.

```tsx
@Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column("double")
    views: number
```

### e. pk선언

- **@PrimaryColumn()** 데코레이터 사용

```tsx
@PrimaryColumn()
    id: number
```

### f. auto_increment

- **@PrimaryGeneratedColumn** 사용

```tsx
@PrimaryGeneratedColumn()
    id: number
```

- 완성된 photo entity
    - reflext-metadata 모듈에서 칼럼의 type이 확실하게 정해지지 않으면 오류가 발생하기때문에, 임의의 type을 하나씩 넣어주었습니다.

```tsx
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: "char",
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column({
    type: "char",
    length: 100,
  })
  filename: string;

  @Column("double")
  views: number;

  @Column({
    type: "boolean",
  })
  isPublished: boolean;
}
```

## 2. data source

- data source는 DB 연결 정보를 저장하는 객체를 의미.
- 연결에 필요한 정보, 연결시 사용할 옵션, entity들을 명시해 연결시 사용할 옵션을 지정합니다.
- 서버 실행(npm run dev) → initialize() 함수가 **최초 1회 호출하며** database를 초기화합니다.
- **synchronize : true 설정 시,  특정한 효과가 있는 것 같은데, 개발단계에서만 사용합니다. 기존데이터를 들고있긴합니다.**
- **migration : true 설정 시,  변경된 데이터만 수정합니다. 배포단계에서 사용합니다.**

```tsx
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [Photo],
    synchronize: true,
    logging: false,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
```

- 이제 AppDataSource에 데이터를 저장할 수 있습니다.

```tsx
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

await AppDataSource.manager.save(photo)
console.log("Photo has been saved. Photo id is", photo.id)
```

## 3. entity manager

- entity는 테이블을 의미하니까, manage는 테이블 관리자를 의미합니다.
- entity manager는 datasource의 **모든 entity를 관리합니다.**

```tsx
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const savedPhotos = await AppDataSource.manager.find(Photo)
console.log("All photos from the db: ", savedPhotos)
```

## 4. repositories

- entity manager 대신 사용할 수 있다.
- 각 entity(table)은 명령을 처리할 자신만의 repository를 가진다.
- entity manager보다 repository를 사용하는게 유지보수 측면에서 효율적이다.

```tsx
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

const photoRepository = AppDataSource.getRepository(Photo)

await photoRepository.save(photo)
console.log("Photo has been saved")

const savedPhotos = await photoRepository.find()
console.log("All photos from the db: ", savedPhotos)
```

## 5. operations

- DBMS의 select, delete, update등의 operation을 typeOrm에서는 아래와같은 절차로 수행한다.
    1. DataSource로부터 테이블의 repository를 가져온다.
    2. repository로부터 operation을 수행할 튜플을 가리키는 객체를 가져온다.**(select)**
    3. 해당 객체를 수정한 후 save()메서드를 호출해 **update**하거나, remove()메서드를 호출해 **delete** 한다.

### a. select

- DBMS의 select는 find, findOneBy, findBy, findAndCount에 대응된다.

```tsx
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photoRepository = AppDataSource.getRepository(Photo)
const allPhotos = await photoRepository.find()
console.log("All photos from the db: ", allPhotos)

const firstPhoto = await photoRepository.findOneBy({
    id: 1,
})
console.log("First photo from the db: ", firstPhoto)

const meAndBearsPhoto = await photoRepository.findOneBy({
    name: "Me and Bears",
})
console.log("Me and Bears photo from the db: ", meAndBearsPhoto)

const allViewedPhotos = await photoRepository.findBy({ views: 1 })
console.log("All viewed photos: ", allViewedPhotos)

const allPublishedPhotos = await photoRepository.findBy({ isPublished: true })
console.log("All published photos: ", allPublishedPhotos)

const [photos, photosCount] = await photoRepository.findAndCount()
console.log("All photos: ", photos)
console.log("Photos count: ", photosCount)
```

### b. update

- update는

```tsx
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photoRepository = AppDataSource.getRepository(Photo)
const photoToUpdate = await photoRepository.findOneBy({
    id: 1,
})
photoToUpdate.name = "Me, my friends and polar bears"
await photoRepository.save(photoToUpdate)
```

## 6. relation

- entity(table)을 생성했다.
- pure한 mysql 라이브러리를 사용한다면 erd를 모른다면 어떻게 table에 쿼리를 날려야할 지 모르지만, typeOrm에서는 entity가 다른 entity간의 관계를 나타낼 수 있다.

### a. 1:1관계(단방향)

- 1:1 관계면 1:1인거지 왜 단방향이라는 키워드가 붙느냐?에 대해선 아래에서 설명

```tsx
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column({
    type: "char",
    length: 100,
  })
  orientation: string;

  @Column({
    type: "boolean",
  })
  compressed: boolean;

  @Column({
    type: "text",
  })
  comment: string;

  @OneToOne(() => Photo)
  @JoinColumn()
  photo: Photo;
}
```

- 위 코드의 마지막줄에 @OneToOne과 @JoinColumn 데코레이터를 통해 PhotoMetadata entity와 Photo entity간의 관계를 표현하고 있다.
- 이 데코레이터에 선언된 photo로 이 entity의 인스턴스(튜플 1개)와 Photo 엔티티의 인스턴스(튜플 1개)를 1:1 대응시킨다.

- 1:1관계의 사용법은 아래와같다.

```tsx
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"

// create a photo
const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

// create a photo metadata
const metadata = new PhotoMetadata()
metadata.height = 640
metadata.width = 480
metadata.compressed = true
metadata.comment = "cybershoot"
metadata.orientation = "portrait"
metadata.photo = photo // this way we connect them

// get entity repositories
const photoRepository = AppDataSource.getRepository(Photo)
const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

// first we should save a photo
await photoRepository.save(photo)

// photo is saved. Now we need to save a photo metadata
await metadataRepository.save(metadata)

// done
console.log(
    "Metadata is saved, and the relation between metadata and photo is created in the database too",
)
```

1. Photo entity의 인스턴스로 photo 생성
2. PhotoMetadata의 인스턴스로 metadata 생성
    1. metadata의 photo 칼럼(프로퍼티)에 1번에서 선언한 photo를 대응
3. 각 엔티티의 repository 가져오기
4. metadata가 photo를 참조하고있으므로, photo가 먼저 DB의 tuple로 존재해야한다.(foreign key, 참조무결성제약) 따라서 photo를 먼저 저장
5. metatdata 저장

---

- 결과

```tsx
mysql> show columns from photo;
+-------------+------------+------+-----+---------+----------------+
| Field       | Type       | Null | Key | Default | Extra          |
+-------------+------------+------+-----+---------+----------------+
| id          | int(11)    | NO   | PRI | NULL    | auto_increment |
| name        | char(100)  | NO   |     | NULL    |                |
| description | text       | NO   |     | NULL    |                |
| filename    | char(100)  | NO   |     | NULL    |                |
| views       | double     | NO   |     | NULL    |                |
| isPublished | tinyint(4) | NO   |     | NULL    |                |
+-------------+------------+------+-----+---------+----------------+

mysql> show columns from photo_metadata;
+-------------+------------+------+-----+---------+----------------+
| Field       | Type       | Null | Key | Default | Extra          |
+-------------+------------+------+-----+---------+----------------+
| id          | int(11)    | NO   | PRI | NULL    | auto_increment |
| height      | int(11)    | NO   |     | NULL    |                |
| width       | int(11)    | NO   |     | NULL    |                |
| orientation | char(100)  | NO   |     | NULL    |                |
| compressed  | tinyint(4) | NO   |     | NULL    |                |
| comment     | text       | NO   |     | NULL    |                |
| photoId     | int(11)    | YES  | UNI | NULL    |                |
+-------------+------------+------+-----+---------+----------------+
```

```tsx
mysql> select COLUMN_NAME, CONSTRAINT_NAME, 
REFERENCED_COLUMN_NAME, REFERENCED_TABLE_NAME 
from information_schema.KEY_COLUMN_USAGE 
where TABLE_NAME = 'photo_metadata';
+-------------+--------------------------------+------------------------+-----------------------+
| COLUMN_NAME | CONSTRAINT_NAME                | REFERENCED_COLUMN_NAME | REFERENCED_TABLE_NAME |
+-------------+--------------------------------+------------------------+-----------------------+
| id          | PRIMARY                        | NULL                   | NULL                  |
| photoId     | REL_99f01ed52303cc16139d69f746 | NULL                   | NULL                  |
| photoId     | FK_99f01ed52303cc16139d69f7464 | id                     | photo                 |
+-------------+--------------------------------+------------------------+-----------------------+
3 rows in set (0.00 sec)

mysql> mysql> select COLUMN_NAME, CONSTRAINT_NAME, 
REFERENCED_COLUMN_NAME, REFERENCED_TABLE_NAME 
from info_schema.KEY_COLUMN_USAGE 
where TABLE_NAME = 'photo';
+-------------+-----------------+------------------------+-----------------------+
| COLUMN_NAME | CONSTRAINT_NAME | REFERENCED_COLUMN_NAME | REFERENCED_TABLE_NAME |
+-------------+-----------------+------------------------+-----------------------+
| id          | PRIMARY         | NULL                   | NULL                  |
+-------------+-----------------+------------------------+-----------------------+
1 row in set (0.00 sec)
```

---

- 단방향?
    - join할때 쓰일 칼럼을 photo_metadata에만 선언했으므로, photo 테이블에서는 metadata를 알 수 없습니다.
        - metadata란?
            
            # **Entity Metadata**
            
            Entity metadata and all related metadata classes contain information about entities, their columns, indices, relations and other entity-related information you can use to create more complex applications or extensions for TypeORM.
            
            - **entity마다 metadata 클래스**가 존재하는데, entity의 정보를 가지고있습니다
    - **이런 상황을 unidirectional(단방향) 관계라고합니다. 복잡한 어플리케이션과 typeorm의 확장기능을 위해선 bidirection한 1:1관계를 만들어줘야합니다.**

### b. 1:1관계(양방향)

- Photo

```tsx
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { PhotoMetadata } from "./PhotoMetadata"

@Entity()
export class Photo {
    /* ... other columns */

    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
    metadata: PhotoMetadata
}
```

- PhotoMetadata

```tsx
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class PhotoMetadata {
    /* ... other columns */

    @OneToOne(() => Photo, (photo) => photo.metadata)
    @JoinColumn()
    photo: Relation<Photo>
}
```

- 함수형 프로그래밍 언어에서  **(L) ⇒ R**  은 R의 값을 바로 반환하게됩니다.
- photo entity의 metadata 클래스를 PhotoMetadata entity가 알고있게됩니다.
- photo의 index, column등을 알고있게됩니다.

- 주의사항으로, JoinColumn은 1:1관계에서 한 entity에서만 사용되어야합니다.

---

### ESM관련

- TS에서 ESM(ES6)를 사용한다면 순환의존성 문제해결을 위해 Relation wrapper를 사용해야합니다.

```tsx
@OneToOne(() => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo: Relation<Photo>;
```

```tsx
@OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata: Relation<PhotoMetadata>;
```

바꿔줍니다.

### c. 1:N관계

- 사진 1개는 작가 1명이, 작가 1명은 여러개의 사진을 보유할 수 있는데 이를 1:N이라고합니다.
- 작가 entity를 만들어봅시다.

```tsx
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Author {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "text",
  })
  name: string;

  @OneToMany(() => Photo, (photo) => photo.author) // note: we will create author property in the Photo class below
  photos: Photo[];
}
```

- OneToMany 데코레이터의 특징으로는 항상 대응되는 entity에 ManyToOne이 필요하다는 것입니다.
- Photo에도 데코레이터를 추가해줍시다.

```tsx
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { PhotoMetadata } from "./PhotoMetadata"
import { Author } from "./Author"

@Entity()
export class Photo {
    /* ... other columns */

    @ManyToOne(() => Author, (author) => author.photos)
    author: Author
}
```

### d. N:N관계(1)

- 1개의 album은 여러 photo를 가질 수 있고, 1장의 photo는 여러 album에 추가될 수 있습니다.
    - 진짜 photo 말고 파일이요
- album entity를 만들어봅시다.

```tsx
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Album {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({
    type: "text",
  })
  name: string;

  @ManyToMany(() => Photo, (photo) => photo.albums)
  @JoinTable()
  photos: Photo[];
}
```

```tsx
export class Photo {
    // ... other columns

    @ManyToMany(() => Album, (album) => album.photos)
    albums: Album[]
}
```

```tsx
mysql> show columns from album;
+-------+---------+------+-----+---------+----------------+
| Field | Type    | Null | Key | Default | Extra          |
+-------+---------+------+-----+---------+----------------+
| id    | int(11) | NO   | PRI | NULL    | auto_increment |
| name  | text    | NO   |     | NULL    |                |
+-------+---------+------+-----+---------+----------------+
2 rows in set (0.00 sec)

mysql> show columns from photo;
+-------------+------------+------+-----+---------+----------------+
| Field       | Type       | Null | Key | Default | Extra          |
+-------------+------------+------+-----+---------+----------------+
| id          | int(11)    | NO   | PRI | NULL    | auto_increment |
| name        | char(100)  | NO   |     | NULL    |                |
| filename    | char(100)  | NO   |     | NULL    |                |
| views       | double     | NO   |     | NULL    |                |
| isPublished | tinyint(4) | NO   |     | NULL    |                |
| authorId    | int(11)    | YES  | MUL | NULL    |                |
+-------------+------------+------+-----+---------+----------------+
6 rows in set (0.00 sec)

mysql> show columns from album_photos_photo;
+---------+---------+------+-----+---------+-------+
| Field   | Type    | Null | Key | Default | Extra |
+---------+---------+------+-----+---------+-------+
| albumId | int(11) | NO   | PRI | NULL    |       |
| photoId | int(11) | NO   | PRI | NULL    |       |
+---------+---------+------+-----+---------+-------+
2 rows in set (0.02 sec)
```

- DBMS는 다중값 속성을 표현할 수 없기에, N:N은 반드시 중간에 연결해줄 테이블이 필요합니다.
- typeOrm은 N:N entity에 대해서는 {이름_joinTable에서 선언된 이름_이름}으로 테이블을 생성해줍니다.
- 제약조건도 이쁘게 추가해줍니다.

```tsx
mysql> select COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_COLUMN_NAME, 
REFERENCED_TABLE_NAME 
from information_schema.KEY_COLUMN_USAGE 
where TABLE_NAME = 'album_photos_photo';
+-------------+--------------------------------+------------------------+-----------------------+
| COLUMN_NAME | CONSTRAINT_NAME                | REFERENCED_COLUMN_NAME | REFERENCED_TABLE_NAME |
+-------------+--------------------------------+------------------------+-----------------------+
| albumId     | PRIMARY                        | NULL                   | NULL                  |
| photoId     | PRIMARY                        | NULL                   | NULL                  |
| photoId     | FK_d292b18c5fbb585c8ddb959ea81 | id                     | photo                 |
| albumId     | FK_fb5deea2817dea41af76b11fd15 | id                     | album                 |
+-------------+--------------------------------+------------------------+-----------------------+
4 rows in set (0.01 sec)
```

### e**.N:N관계(2)**

- 근데, typeOrm이 자동으로 추가해주는 테이블에 속성이 필요할때가 있습니다.
- typeOrm에서 이를 위해서는 many-to-one으로 각각의 entity에 연결된 entity를 선언해주면됩니다.

- Post와 Category의 N:N관계를 매핑해주는 PostToCategory 선언

```tsx
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "./post"
import { Category } from "./category"

@Entity()
export class PostToCategory {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number

    @Column()
    public postId!: number

    @Column()
    public categoryId!: number

    @Column()
    public order!: number

    @ManyToOne(() => Post, (post) => post.postToCategories)
    public post!: Post

    @ManyToOne(() => Category, (category) => category.postToCategories)
    public category!: Category
}
```

```tsx
// category.ts
...
@OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
public postToCategories!: PostToCategory[];

// post.ts
...
@OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
public postToCategories!: PostToCategory[];
```