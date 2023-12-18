//--------------------USERS-------------------------
//xóa user  nếu không có thuộc tính = null

/*lọc user  nếu tài khoản là tài khoản ảo : 
1.  không có giá trị role
2.  nếu có 4 trong 4 thuộc tính là null : location , profile + profsstion+ birthday 
3.  Không có hoạt động : tạo bài post , like, comment  ( update nếu tính từ thời điểm hoạt động > 180 ngày)
*/