## Bài tập về nhà buổi 37 - Blog with login

1: API Server

**[https://api-auth-two.vercel.app](https://api-auth-two.vercel.app)**

Các resources:

- **auth/**

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

**[https://code-fullstack-exercise37.vercel.app/](https://code-fullstack-exercise37.vercel.app)**

Đăng nhập

Đăng ký

Logout

Khi đăng nhập xong có thể post bài

Khi chưa đăng nhập không hiển thị form post bài

Khi đăng nhập rồi không thể vào trang đăng nhập hoặc đăng ký.
