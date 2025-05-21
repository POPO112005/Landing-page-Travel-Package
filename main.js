// index

$(document).ready(function(){
    $("#icon").hide();
    $("#signout").hide();
    

    $("#btnLogin").click(function () {
        var u = $("#txtUser").val();
        var p = $("#txtPass").val();

        if (p == "123456") {
            alert("Login Success !!!\n ท่านเข้าสู่ระบบสำเร็จ");
            $("#userProfile").html(u);
            $("#signin").hide();
            $("#icon").show();
            $("#signout").show();
            
        } else {
            alert("Login Fail !!!\n รหัสผ่านไม่ถูกต้อง");
        }
    });
  });

/////////////////////////////////////////////////////////////////////////////////
  // oneway trip // 
let tripType = document.getElementById('tripType');
let returnDateContainer = document.getElementById('returnDateContainer');

tripType.addEventListener('change', function() {
    if (this.value === 'oneway') {
        returnDateContainer.style.display = 'none';
        
    } else {
        returnDateContainer.style.display = 'flex';
        
    }
});

document.getElementById('swapLocations').addEventListener('click', function() {
  let departure = document.getElementById('departureLocation'); 
  let arrival = document.getElementById('arrivalLocation');

  let tempValue = departure.value;
  departure.value = arrival.value; // swap values
  arrival.value = tempValue;

  this.classList.add('bg-primary');
  this.querySelector('i').classList.add('text-white'); // add classes

  setTimeout(() => {
    this.classList.remove('bg-primary');
    this.querySelector('i').classList.remove('text-white'); // remove classes
  }, 300);
});

$(document).ready(function() {
  // ซ่อน QR code ตอนเริ่มต้น
  $("#qrcode").hide();
  $("#slip").hide();

  // แสดง QR code เมื่อกดปุ่ม payment
  $("#payment").click(function () {
      $("#qrcode").show();
      $("#slip").show();
  });

  // จัดการการกดปุ่ม bookFlightBtn
  $("#bookFlightBtn").click(function() {
      
      var tripType = $('#tripType').val();
      var flightClass = $('#flightClass').val();
      var departureLocation = $('#departureLocation').val();
      var arrivalLocation = $('#arrivalLocation').val();
      var departureDate = $('#departureDate').val();
      var returnDate = $('#returnDate').val();
      var passengerCount = $('#passengerCount').val();
      var totalPrice = $('#totalPriceDisplay').text();
      
     
    
      
          var msg2 = "<div class='alert alert-success'>";
          msg2 += "คุณได้ทำการจองเที่ยวบิน: <span class='text-primary'>" + tripType + "</span><br>" + "ประเภทที่นั้ง: <span class='text-primary'>" + " " + flightClass + "</span><br>";
          msg2 += "สนามบินต้นทาง: <span class='text-primary'>" + departureLocation + "</span><br> " + "สนามบินปลายทาง : <span class='text-primary'>" + arrivalLocation + "</span><br>";
          msg2 += "วันออกเดินทาง: <span class='badge text-bg-light'>" + departureDate + "</span><br>";
          if (tripType == 'round-trip'){
              msg2 += "วันเดินทางกลับ: <span class='badge text-bg-light'>" + returnDate + " </span><br> ";
          }
          msg2 += "ผู้โดยสาร: <span class='badge text-bg-light'>" + passengerCount + "</span><br>";
          msg2 += "-------------------------<br>";
          msg2 += "ยอดชำระเงินทั้งหมด: <span class='badge text-bg-success'>" + totalPrice + "</span> บาท<br>";
          msg2 += "-------------------------<br>";
          msg2 += "ท่านได้จองตั๋วเครื่องบินเรียบร้อยแล้ว</div>";
          
          // แสดง alert
          alert("จองสำเร็จ");
          
          // แสดงข้อความสรุป
          $('#display').html(msg2);
          
     
  });
});

function calculateFlightPrice() {
    const tripType = $('#tripType').val();
    const flightClass = $('#flightClass').val();
    const departureLocation = $('#departureLocation').val();
    const arrivalLocation = $('#arrivalLocation').val();
    const passengerCount = parseInt($('#passengerCount').val()) || 1;
  
    let basePrice = 0;
  
    // ✅ ราคาแบบ custom ต่อเส้นทาง
    const routePrices = {
      "Phuket, Thailand->Krabi, Thailand": 1000,
      "Phuket, Thailand->Pattaya, Thailand": 1000,
      "Phuket, Thailand->Satun, Thailand": 1000,
      "Phuket, Thailand->Trang, Thailand": 1000,
      "Phuket, Thailand->Surat Thani, Thailand": 1000,
      "Krabi, Thailand->Pattaya, Thailand": 1100,
      "Krabi, Thailand->Satun, Thailand": 1100,
      "Krabi, Thailand->Trang, Thailand": 1100,
      "Krabi, Thailand->Surat Thani, Thailand": 1100,
      "Pattaya, Thailand->Satun, Thailand": 1200,
      "Pattaya, Thailand->Trang, Thailand": 1200,
      "Pattaya, Thailand->Surat Thani, Thailand": 1200,
      "Satun, Thailand->Trang, Thailand": 1300,
      "Satun, Thailand->Surat Thani, Thailand": 1300,
      "Trang, Thailand->Surat Thani, Thailand": 1400
      // 👉 หมายเหตุ: ไม่จำเป็นต้องใส่ route ย้อนกลับ
    };
  
    const routeKey = `${departureLocation}->${arrivalLocation}`;
    const reverseRouteKey = `${arrivalLocation}->${departureLocation}`;
  
    if (
      departureLocation && departureLocation !== "Flying from" &&
      arrivalLocation && arrivalLocation !== "Flying to"
    ) {
      basePrice = routePrices[routeKey] || routePrices[reverseRouteKey] || 0;
    }
  
    // ✅ multiplier ตาม class
    let classMultiplier = 1;
    if (flightClass === "Premium Economy") classMultiplier = 1.5;
    else if (flightClass === "Business") classMultiplier = 2.5;
    else if (flightClass === "First Class") classMultiplier = 4;
  
    // ✅ คำนวณราคาสุดท้าย
    let totalPrice = basePrice * classMultiplier;
    if (tripType === "round-trip") totalPrice *= 2;
    totalPrice *= passengerCount;
  
    const formattedPrice = '฿' + totalPrice.toLocaleString();
    $('#totalPriceDisplay').text(formattedPrice);
  }
  
  
  
// Recalculate price when any form field changes
$('#tripType, #flightClass, #departureLocation, #arrivalLocation, #passengerCount').on('change', function() {
  calculateFlightPrice();
});


/////////////////////////////////////////////////////////////////


