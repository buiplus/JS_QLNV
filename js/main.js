

function getEle(id){
	return document.getElementById(id);
}

var dsNhanVien = new DanhSachNhanVien();

function formValidation(){
	var bool = true;
	if(!KiemTraRong("ho", "thongBaoHo", "Vui lòng nhập họ")){
		bool = false;
	}
	else{
		if(!KiemTraDinhDangChu("ho", "thongBaoHo", "Họ phải là chữ")){
			bool = false;
		}
	};
	if(!KiemTraRong("ten", "thongBaoTen", "Vui lòng nhập Tên")){
		bool = false;
	}
	else{
		if(!KiemTraDinhDangChu("ten", "thongBaoTen", "Tên phải là chữ")){
			bool = false;
		}
	}
	if(!KiemTraRong("msnv", "thongBaoMaNV", "Vui lòng nhập mã NV")){
		bool = false;
	}
	else{
		if(!KiemTraChieuDaiMaNhanVien("msnv", "thongBaoMaNV", 2, 4, "Mã Nhân Viên phải từ ")){
			bool = false;
		};
	}
	if(!KiemTraChucVu()){
		bool = false;
	}
	return bool;
}


function ThemNhanVien(){
	console.log("hello");
	
	if(formValidation()==true){
		var ho = getEle("ho").value;
		var ten = getEle("ten").value;
		var msnv = getEle("msnv").value;
		var ngayLam = getEle("datepicker").value;
		var chucVu = getEle("chucvu").value;

		if(KiemTraMaNhanVien(msnv)){
			var nhanVien = new NhanVien(ho, ten, msnv, ngayLam, chucVu);
			nhanVien.tinhLuong();
			dsNhanVien.Add(nhanVien);
		//	console.log(dsNhanVien.DSNV);
			HienThi(dsNhanVien.DSNV);
			FormReset();
			
		}else{
			console.log("Mã nhân viên bị trùng. Bạn vui lòng xem lại!!");
			
		}

	}
}


function HienThi(mangDauVao){
	console.log(mangDauVao);
	var tBody = getEle("tbodyHienThi");
	tBody.innerHTML = "";
	for (var i = 0; i < mangDauVao.length; i++) {

		var tr_nv = document.createElement("tr");
		tr_nv.classList = "tr_nv";

		var nhanVien = mangDauVao[i];

		var tdMaNV = document.createElement("td");
		tdMaNV.innerHTML = nhanVien._maNV;
		tr_nv.appendChild(tdMaNV);

		var tdHoTen = document.createElement("td");
		tdHoTen.innerHTML = nhanVien._ho + " "+ nhanVien._ten;
		tr_nv.appendChild(tdHoTen);

		var tdNgayDiLam = document.createElement("td");
		tdNgayDiLam.innerHTML = nhanVien._ngayDiLam;
		tr_nv.appendChild(tdNgayDiLam);


		var tdChucVu = document.createElement("td");
		tdChucVu.innerHTML = nhanVien._chucVu;
		tr_nv.appendChild(tdChucVu);

		var tdTongLuong = document.createElement("td");
		tdTongLuong.innerHTML = nhanVien.tinhLuong();
		tr_nv.appendChild(tdTongLuong);
		
		var tdThaoTac = document.createElement("td");
												//string template
												//let intro = "Hello everyone, I'm";
												// let firstName = 'Lam';
												// let lastName = 'Pham';

												// let full3 = `${intro} ${firstName} ${lastName}.`;
												// console.log(full3);
												// => Hello everyone, I'm Lam Pham.

		var button = `
			<button class = " btn btn-success mr-2"
			id = "btnSua_${nhanVien._maNV}"
			data-manv="${nhanVien._maNV}"
			data-ho ="${nhanVien._ho}"
			data-ten ="${nhanVien._ten}"
			data-ngaylam="${nhanVien._ngayDiLam}"
			data-chucvu="${nhanVien._chucVu}">Show</button>

			<button class="btn btn-danger mr-2"
			id="btnXoa_${nhanVien._maNV}"
			data-manv="${nhanVien._maNV}">Delete</button>
		`;
		tdThaoTac.innerHTML = button;
		tr_nv.appendChild(tdThaoTac);

		tBody.appendChild(tr_nv);

		HienThiThongTin("btnSua_" +nhanVien._maNV);
		XoaNV("btnXoa_"+nhanVien._maNV);
	}

}
function LuuDuLieu(){
	//B1: Chuyển từ kiểu mảng thành kiểu json
	var JsonDSNhabVien = JSON.stringify(dsNhanVien.DSNV);
	//B2: Lưu lại vào localStorage
	localStorage.setItem("DSNV", JsonDSNhabVien);
}
function LayDuLieu(){
	//B1: GetItems : lấy nó ra --> trả về 1 chuỗi JSON
	var getJSon = localStorage.getItem("DSNV");
		//B2: parse lại từ chuỗi thành mảng
	dsNhanVien.DSNV = JSON.parse(getJSon);
	console.log(dsNhanVien);
	HienThi(dsNhanVien.DSNV);
	
}
// ---reset form---
function FormReset(){
	var formNV = getEle("formNhanVien");
	formNV.reset();
}


function KiemTraMaNhanVien(id){
	var bool = true;//giả sử không trùng
	for(var i=0 ; i< dsNhanVien.DSNV.length; i++){
		if(dsNhanVien.DSNV[i]._maNV == id){
			bool = false;//phát hiện trùng , không cho nhập
		}
	}
	return bool;
}
// ------------tìm nhân viên theo TÊN---------------
function TimNVTheoTen(){
	//lấy keyword người dùng nhập
	var keyword = getEle("txtTenTim").value;
	keyword = keyword.toLowerCase().trim();
	keyword = keyword.replace(/\s/g,'');
	var mangTim = dsNhanVien.TimNhanVienTheoTen(keyword);
	if(mangTim.length ==0){
		console.log("Không tìm thấy tên nhân viên theo keyword");
		
	}
	HienThi(mangTim);
}

//lấy thông tin từ 2 nút ẩn
//Show thông tin lên form
//Ấn nút hiển thị thì nó show thông tin của id đó
function HienThiThongTin(id){
	getEle(id).addEventListener("click",function(){
			var manv = this.getAttribute("data-manv");
			var ho = this.getAttribute("data-ho");
			var ten = this.getAttribute("data-ten");
			var ngaylam = this.getAttribute("data-ngaylam");
			var chucvu = this.getAttribute("data-chucvu");

			getEle("msnv").value = manv;
			getEle("ho").value = ho;
			getEle("ten").value = ten;
			getEle("datepicker").value = ngaylam;
			getEle("chucvu").value = chucvu;

			getEle("msnv").setAttribute("readonly",true);
			getEle("btnThemNV").style.display = "none";
			getEle("btnCapNhatNV").style.display = "block";
		})
		
}
	


function CapNhatThongTin(){
	var ho = getEle("ho").value;
	var ten = getEle("ten").value;
	var msnv = getEle("msnv").value;
	var ngayLam = getEle("datepicker").value;
	var chucVu = getEle("chucvu").value;

	var nhanVienMoi = new NhanVien(ho, ten, msnv, ngayLam, chucVu);
	nhanVienMoi.tinhLuong();
	dsNhanVien.CapNhatNV(nhanVienMoi);
	HienThi(dsNhanVien.DSNV);
}
// ---------XỬ LÝ YÊU CẦU -----------
function XoaNV(id){
	getEle(id).addEventListener("click", function(){
		var manv = this.getAttribute("data-manv");
		dsNhanVien.XoaNhanVien(manv);
		HienThi(dsNhanVien.DSNV);
	})
}

function SapXepLNV(){
	dsNhanVien.SapXepLuongNhanVien();
	HienThi(dsNhanVien.DSNV);
}

function NVLuongCao(){
	var mangLuong = dsNhanVien.NVLuongCao();
	HienThi(mangLuong);
}

function NVLuongMAX(){
	var mangLuong = dsNhanVien.NVMax();
	HienThi(mangLuong);
}
// ----------------------XỬ LÝ ĐĂNG NHẬP--------------
function KiemTraRong(idField, idThongBao, tbContent){
	var bool = true;
	var value_input = getEle(idField).value;
	if(value_input ===""){
		getEle(idThongBao).innerHTML = tbContent;
		bool = false;
	}else{
		getEle(idThongBao).innerHTML = "";
	}
	return bool;
}

//Kiểm tra chức vụ
function KiemTraChucVu(){
	var bool = true;
	var chucVu = getEle("chucvu");
	if(chucVu.selectedIndex == 0){
		getEle("thongBaoChucVu").innerHTML = "Vui lòng chức vụ";
		bool = false;
	}
	else{
		getEle("thongBaoChucVu").innerHTML = "";
	}
	return bool;
}
//Kiểm tra chiều dài của mã NV
function KiemTraChieuDaiMaNhanVien(idField, idThongBao, min, max, tbContent){
	var bool = true;
	var value_input = getEle(idField).value;
	if(value_input.length < min || value_input.length > max){
		getEle(idThongBao).innerHTML = tbContent + min + " tới " + max + " ký tự";
		bool = false;
	}
	else{
		getEle(idThongBao).innerHTML = "";
	}
	return bool;
}
//Kiểm tra họ và tên
function KiemTraDinhDangChu(idField, idThongBao, tbContent){
	var bool = true;
	var value_input = getEle(idField).value;
	var patt = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
	"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
	"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
	if(!patt.test(value_input)){
		getEle(idThongBao).innerHTML = tbContent;
		bool = false;
	}
	else{
		getEle(idThongBao).innerHTML = "";
	}
	return bool;
}


var btnLayThongTin = getEle("btnLayThongTin");
btnLayThongTin.addEventListener("click",LayDuLieu);

var btnTimNV = getEle("btnTimNV");
btnTimNV.addEventListener("click",TimNVTheoTen);

var txtTenTim =getEle("txtTenTim");
txtTenTim.addEventListener("keyup", TimNVTheoTen);

var btnCapNhat = getEle("btnCapNhatNV");
btnCapNhat.addEventListener("click", CapNhatThongTin);

var btnLuuDuLieu = getEle("btnLuuThongTin");
btnLuuDuLieu.addEventListener("click", LuuDuLieu);

var btnsapxep = getEle("btnSapXep");
btnsapxep.addEventListener("click",SapXepLNV );

var btnTongLuong = getEle("btnNVLuongTo");
btnTongLuong.addEventListener("click", NVLuongCao);

var btnLuongMax = document.getElementById("btnLuongMax");
btnLuongMax.addEventListener("click",NVLuongMAX);
