import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';
import { Blog } from '../../blog/entities/blog.entity';

@Entity('followers')
export class Follower {
  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_followers',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'follower_id',
      referencedColumnName: 'id',
    },
  })
  followers: User[];
}

@Entity('likes')
export class Likes {
  @ManyToMany(() => User)
  @JoinTable({
    name: 'likes',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  like: Blog[];
}

@Entity('interests')
export class Interest {
  @ManyToMany(() => User)
  @JoinTable({
    name: 'interest',
    joinColumn: {
      name: 'workshop_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  interested: Workshop[];
}
