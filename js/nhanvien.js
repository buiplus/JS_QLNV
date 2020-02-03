//Tạo 1 lớp đối tượng nhân viên
//class TenClass{
	//Thuộc tính

	//get set (method)

	//Hàm khởi tạo (constructor)

	//Method
//}

function NhanVien(ho, ten, maNV, ngayDiLam, chucVu){
	// Thuộc tính
	this._ho = ho;
	this._ten = ten;
	this._maNV = maNV;
	this._ngayDiLam = ngayDiLam;
	this._chucVu = chucVu;
	this._luongCB = 600;
	this._luongNV = 0;
	//Phương thức
	this.tinhLuong = function(){
		switch(this._chucVu){
			case "Sếp":
				return this._luongNV = this._luongCB * 3;
				break;
			case "Trưởng phòng":
				return this._luongNV = this._luongCB * 2;
				break;
			case "Nhân viên":
				return this._luongNV = this._luongCB * 1;
				break;
			default:
				return "Chưa nhập chức vụ";
				break;
		}
	}
}
NhanVien.prototype._soNgay = 26;

