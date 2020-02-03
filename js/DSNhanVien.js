

function DanhSachNhanVien(){
	this.DSNV = [];

	//phương thức thêm nhân viên
	this.Add = function(nv){
		this.DSNV.push(nv);
	}
}

DanhSachNhanVien.prototype.TimNhanVienTheoTen = function(key){
	var mangKetQua = [];
	for(var i=0; i<this.DSNV.length; i++){
		var ten = this.DSNV[i]._ten;
		if(ten.toLowerCase().indexOf(key) !=-1){
			mangKetQua.push(this.DSNV[i]);
		}
	}
	return mangKetQua;
}

DanhSachNhanVien.prototype.TimNhanVienTheoMa = function(id){
	for(var i=0; i< dsNhanVien.DSNV.length; i++){
		if(dsNhanVien.DSNV[i]._maNV == id){
			return i;
		}
	}
}

DanhSachNhanVien.prototype.CapNhatNV = function(nhanviencapnhat){
	var index = this.TimNhanVienTheoMa(nhanviencapnhat._maNV);
	this.DSNV[index] = nhanviencapnhat;
}

DanhSachNhanVien.prototype.XoaNhanVien = function(id){
	var index = this.TimNhanVienTheoMa(id);
	this.DSNV.splice(index,1);
}

DanhSachNhanVien.prototype.SapXepLuongNhanVien  = function(){
	this.DSNV.sort(function(a,b){
		return a._luongNV - b._luongNV;
	})
}

DanhSachNhanVien.prototype.NVLuongCao = function(){
	var mangLuongNV = [];
	for(var i=0 ; i< this.DSNV.length; i++){
		var nhanVien = this.DSNV[i];
		if(nhanVien._luongNV >1000){
			mangLuongNV.push(nhanVien);
		}
	}
	return mangLuongNV;
}

DanhSachNhanVien.prototype.NVMax = function(){
	var mangLuongNV = [];
	for(var i=0; i<this.DSNV.length; i++){
		var nhanVien = this.DSNV[i];
		if(nhanVien._luongNV > this.DSNV[0]){
			nhanVien =this.DSNV[i];
			mangLuongNV.push(nhanVien);
		}
	}
	return mangLuongNV;
}