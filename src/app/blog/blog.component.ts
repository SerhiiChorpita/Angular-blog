import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public newUser!: UserBase;
  public newPost!: PostInfo;

  public userName!: string;
  public signInCheck = true;
  public signInVis!: boolean;
  public signUpVis!: boolean;
  public addVis!: boolean;
  public editVis!: boolean;

  public signInEmail: string = '';
  public signInPass: string = '';

  public signUpUserName!: string;
  public signUpEmail!: string;
  public signUpPass!: string;

  public addTitle!: string;
  public addText!: string;

  public editTitle!: string;
  public editText!: string;
  public currId!: number;

  public dateString: Date = new Date();
  public newDate: string = `${this.dateString.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}, ${this.dateString.toLocaleDateString()}`;

  public visY = 'visibility: visible';
  public visN = 'visibility: hidden';

  public inpValue!: string;

  public allPosts: Array<PostInfo> = [
    {
      title: 'First post',
      postedBy: 'admin',
      text: 'Sign up to create your account and start to use Angular Blog',
      timeDate: '15:16, 14.08.2022',
    },
  ];

  public allUsers: Array<UserBase> = [
    {
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    },
  ];

  constructor() { }
  ngOnInit(): void { }

  checkSignIn(): void {
    if (
      this.signInEmail.toLowerCase() === 'admin@gmail.com' &&
      this.signInPass.toLocaleLowerCase() === 'admin'
    ) {
      this.signInCheck = false;
      this.userName = this.allUsers[0].userName;
    }
    this.allUsers.forEach((element) => {
      if (
        element.email === this.signInEmail &&
        element.password === this.signInPass
      ) {
        this.signInCheck = false;
        this.userName = element.userName;
      }
    });
    this.resetValue();
  }
  updateSignUp(): void {
    this.newUser = {
      userName: this.signUpUserName,
      email: this.signUpEmail,
      password: this.signUpPass,
    };
    this.allUsers.push(this.newUser);
    this.signInCheck = false;
    this.userName = this.signUpUserName;
    this.resetValue();
  }
  addPost(): void {
    this.newPost = {
      title: this.addTitle,
      postedBy: this.userName,
      text: this.addText,
      timeDate: this.newDate,
    };
    this.allPosts.push(this.newPost);
    this.resetValue();
  }
  editPost(index: number): void {
    this.editTitle = this.allPosts[index].title;
    this.editText = this.allPosts[index].text;
    this.currId = index;
  }
  updatePost(): void {
    this.allPosts[this.currId].title = this.editTitle;
    this.allPosts[this.currId].text = this.editText;
    this.resetValue();
  }
  deletePost(index: number): void {
    this.allPosts.splice(index, 1);
  }
  resetValue(): void {
    if (!this.signUpVis) {
      this.signUpUserName = '';
      this.signUpEmail = '';
      this.signUpPass = '';
    }
    if (!this.signInVis) {
      this.signInEmail = '';
      this.signInPass = '';
    }
    if (!this.addVis) {
      this.addTitle = '';
      this.addText = '';
    }
    if (!this.editVis) {
      this.editTitle = '';
      this.editText = '';
    }
    if (this.signInCheck) {
      this.userName = '';
    }
  }
}
interface PostInfo {
  title: string;
  postedBy: string;
  text: string;
  timeDate: string;
}
interface UserBase {
  userName: string;
  email: string;
  password: string;
}
