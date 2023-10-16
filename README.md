## Bài tập về nhà - Blog login with Datepicker

1: API Server

**[https://api-auth-two.vercel.app](https://api-auth-two.vercel.app)**

Các resources:

- **auth/**

  - **/profile**(get): get profile

    Headers: Authorization Bearer

    Response:

    ```json
    {
      "code": 200,
      "status_code": "SUCCESS",
      "message": "Thành công",
      "data": {
        "_id": "652c2071afd8990b69a321b4",
        "name": "Nguyễn Dương✅",
        "email": "nguyenduong@fullstack.edu.vn",
        "avatar": "",
        "blogs": [
          {
            "_id": "652c20a8afd8990b69a321c1",
            "title": "Hello world",
            "content": "First title!\n\nhttps://code-fullstack-exercise37.vercel.app\n\ndocument.write('1')",
            "userId": "652c2071afd8990b69a321b4",
            "createdAt": "2023-10-15T17:26:00.257Z",
            "__v": 0
          }
        ],
        "createdAt": "2023-10-15T17:25:05.447Z",
        "updatedAt": "2023-10-15T18:47:57.733Z"
      }
    }
    ```

    ***

  - **/login**(Post): login

    Body: `email`, `password`

    Response:

    ```json
    {
      "code": 200,
      "status_code": "SUCCESS",
      "message": "Đăng nhập thành công",
      "data": {
        "_id": "65283c1ee848d5a6c9672232",
        "name": "Nguễn Minh Nhật Dương",
        "email": "duongcoilc2004@gmail.com",
        "createdAt": "2023-10-12T18:34:06.422Z",
        "updatedAt": "2023-10-13T05:39:25.561Z",
        "__v": 0,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjgzYzFlZTg0OGQ1YTZjOTY3MjIzMiIsImlhdCI6MTY5NzE3NjUxNCwiZXhwIjoxNjk3MTgwMTE0fQ.FmUqGebAYDpsAp2UQ_hVPZlld3qVgltL8Tog17yZTMI",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjgzYzFlZTg0OGQ1YTZjOTY3MjIzMiIsImlhdCI6MTY5NzE3NjUxNCwiZXhwIjoxNjk3MjYyOTE0fQ.VW3v8O7u1yN2zZ0OqM8E00INHXuG47z9mjzbBbprayg"
      }
    }
    ```

    ***

  - **/register**(Post): register

    Body: `email`, `password`, `name`

    Response:

    ```json
    {
      "code": 201,
      "status_code": "SUCCESS",
      "message": "Tạo tài khoản thành công",
      "data": {}
    }
    ```

    ***

  - **/logout**(Post):logout

    Headers: Authorization accessToken

    Response:

    ```json
    {
      "code": 200,
      "status_code": "SUCCESS",
      "message": "Đăng xuất thành công",
      "data": {}
    }
    ```

    ***

    - **/refresh-token**(Post): refresh

    Body: `"refreshToken": refreshToken`

    Response:

    ```json
    {
      "code": 200,
      "status_code": "SUCCESS",
      "message": "Thành công",
      "data": {
        "token": {
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjgzYzFlZTg0OGQ1YTZjOTY3MjIzMiIsImlhdCI6MTY5NzE3Njg3MCwiZXhwIjoxNjk3MTgwNDcwfQ.mRKnrXwSKk9GJmCbx88h4ruknoo4o_w_o02BXkp-Qfk"
        }
      }
    }
    ```

- **/blogs**

  - **/**(get): Lấy 10 blog mới nhất (limit mặc định là **10**, page mặc định là **1**)

  Response:

  ```json
  {
    "code": 200,
    "status_code": "SUCCESS",
    "message": "Thành công",
    "data": [
      {
        "_id": "6528016d0f2f470d3538ef46",
        "title": "Xin Chào F8",
        "content": "Hello F8",
        "userId": {
          "_id": "652801360f2f470d3538ef3f",
          "name": "Lê Đức Nam"
        },
        "createdAt": "2023-10-12T14:23:41.397Z",
        "updatedAt": "2023-10-12T14:23:41.397Z",
        "__v": 0
      }
      //...
    ]
  }
  ```

  ***

  - **/:blogId**(get): Lấy 1 blog

    Response:

    ```json
    {
      "code": 200,
      "status_code": "SUCCESS",
      "message": "Thành công",
      "data": {
        "_id": "6528016d0f2f470d3538ef46",
        "title": "Xin Chào F8",
        "content": "Hello F8",
        "userId": {
          "_id": "652801360f2f470d3538ef3f",
          "name": "Lê Đức Nam"
        },
        "createdAt": "2023-10-12T14:23:41.397Z",
        "updatedAt": "2023-10-12T14:23:41.397Z",
        "__v": 0
      }
    }
    ```

2: Chức năng chính:

**[https://code-exercise-blog.vercel.app/](https://code-exercise-blog.vercel.app)**

Đăng nhập

Đăng ký

Logout

Khi đăng nhập xong có thể post bài

Chọn ngày khi post bài.

Khi chưa đăng nhập không hiển thị form post bài

Khi đăng nhập rồi không thể vào trang đăng nhập hoặc đăng ký.
