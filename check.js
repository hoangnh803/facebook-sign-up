document.addEventListener('DOMContentLoaded', function () {
  var signUpButton = document.querySelector('.button button');
  var buttonClick = 0;
  signUpButton.addEventListener('click', function () {
    buttonClick++;
    validateForm();
  });

  // Hàm kiểm tra tính hợp lệ của các trường nhập liệu
  function validateForm() {
    var firstname = document.getElementById('firstname');
    var surname = document.getElementById('surname');
    var mobileOrEmail = document.getElementById('mobileOrEmail').value.trim();
    var password = document.getElementById('password').value.trim();

    if (firstname.value.trim() === '' && buttonClick > 0) {
      displayErrorIcon('firstname');
    } else {
      hideErrorIcon('firstname');
      var errorField = document.querySelector('.firstname');
      errorField.style.display = 'none'; // Ẩn ErrorField
    }

    if (surname.value.trim() === '' && buttonClick > 0) {
      displayErrorIcon('surname');
    } else {
      hideErrorIcon('surname');
      var errorField = document.querySelector('.surname');
      errorField.style.display = 'none'; // Ẩn ErrorField
    }

    if (!validateMobileOrEmail(mobileOrEmail) && buttonClick > 0) {
      displayErrorIcon('mobileOrEmail');
    } else {
      hideErrorIcon('mobileOrEmail');
      var errorField = document.querySelector('.mobileOrEmail');
      errorField.style.display = 'none'; // Ẩn ErrorField
    }

    if (!validatePassword(password) && buttonClick > 0) {
      displayErrorIcon('password');
    } else {
      hideErrorIcon('password');
      var errorField = document.querySelector('.password');
      errorField.style.display = 'none'; // Ẩn ErrorField
    }

    if (!validateDateOfBirth() && buttonClick > 0) {
      displayErrorIcon('dob');
    } else {
      hideErrorIcon('dob');
      var errorField = document.querySelector('.dob');
      errorField.style.display = 'none'; // Ẩn ErrorField
    }

    if (!isAnyRadioChecked() && buttonClick > 0) {
      displayErrorIcon('gender');
    } else {
      hideErrorIcon('gender');
      var errorField = document.querySelector('.gender');
      errorField.style.display = 'gender'; // Ẩn ErrorField
    }

    // Hàm kiểm tra định dạng của email hoặc số điện thoại
    function validateMobileOrEmail(input) {
      // Kiểm tra định dạng email
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Kiểm tra định dạng số điện thoại
      var phonePattern = /^\d{10,11}$/;

      return emailPattern.test(input) || phonePattern.test(input);
    }

    // Hàm kiểm tra mật khẩu
    function validatePassword(password) {
      // Kiểm tra mật khẩu có ít nhất 6 ký tự, gồm chữ cái, số, và ký tự đặc biệt
      var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      return passwordPattern.test(password);
    }




    function validateDateOfBirth() {
      var month = document.getElementById('month').value;
      var day = document.getElementById('day').value;
      var year = document.getElementById('year').value;

      // Tạo một đối tượng ngày từ giá trị ngày, tháng và năm
      var dob = new Date(year, month - 1, day);

      // Kiểm tra xem ngày sinh có ở trong quá khứ không
      var currentDate = new Date();
      if (dob >= currentDate) {
        return false;
      }
      // Hàm kiểm tra ngày tháng có hợp lệ không
      if (dob instanceof Date && !isNaN(dob)) {
        try {
          console.log(day);
          console.log(month);
          console.log(year);
          if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
          }

          if (day <= 0 || month <= 0 || year <= 0) {
            return false;
          }

          if (month > 12) {
            return false;
          }

          // assuming no leap year by default
          var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (year % 4 == 0) {
            // current year is a leap year
            daysPerMonth[1] = 29;
          }

          if (day > daysPerMonth[month - 1]) {
            return false;
          }
        } catch (e) {
          return false;
        }
        return true;
      } else {
        return false;
      }

      // Ngày sinh hợp lệ
      return true;
    }
  }

  function isAnyRadioChecked() {
    var radios = document.querySelectorAll('input[name="gender"]');
    var checked = false;
    radios.forEach(function (radio) {
      if (radio.checked) {
        checked = true;
      }
    });
    return checked;
  }


  function displayErrorIcon(fieldId) {
    var icon = document.querySelector('#' + fieldId + ' + .img');
    var borderColor;
    if (fieldId === 'dob') {
        borderColor = document.querySelectorAll('select');
    } else if (fieldId === 'gender') {
        borderColor = document.querySelectorAll('.person div');
    } else {
        borderColor = document.querySelector('#' + fieldId);
    }
    
        icon.style.display = 'inline-block';
        if (fieldId === 'dob' || fieldId === 'gender') {
            borderColor.forEach(function(elem) {
                elem.style.border = '1px solid red';
            });
        } else {
            borderColor.style.border = '1px solid red';
        }
    
}

// Ẩn biểu tượng lỗi khi trường nhập liệu được tương tác
function hideErrorIcon(fieldId) {
    var icon = document.querySelector('#' + fieldId + ' + .img');
    var borderColor;
    if (fieldId === 'dob') {
        borderColor = document.querySelectorAll('select');
    } else if (fieldId === 'gender') {
        borderColor = document.querySelectorAll('.person div');
    } else {
        borderColor = document.querySelector('#' + fieldId);
    }
    
        icon.style.display = 'none';
        if (fieldId === 'dob' || fieldId === 'gender') {
            borderColor.forEach(function(elem) {
                elem.style.border = '1px solid #ccc';
            });
        } else {
            borderColor.style.border = '1px solid #ccc';
        }
        var errorField = document.querySelector('.' + fieldId);
        errorField.style.display = 'block';
    
}



  // Xử lý sự kiện khi ô input được tương tác
  var inputFields = document.querySelectorAll('input');
  inputFields.forEach(function (input) {
    input.addEventListener('focus', function (event) {
      var icon = event.target.nextElementSibling;
      console.log(icon);
      if (icon.style.display === 'inline-block') {
        icon.style.display = 'none'; // Ẩn biểu tượng lỗi nếu đang hiển thị
        var errorField = document.querySelector('.' + event.target.id);
        errorField.style.display = 'block'; // Hiển thị ErrorField
      }
    });
  });

  inputFields.forEach(function (input) {
    input.addEventListener('blur', function (event) {
      var icon = event.target.nextElementSibling;
      if (icon.style.display === 'none') {
        icon.style.display = 'inline-block'; // Hiện biểu tượng lỗi
        var errorField = document.querySelector('.' + event.target.id);
        errorField.style.display = 'none'; // Ẩn ErrorField
      }
    });
  });

  var inputAndSelectFields = document.querySelectorAll('input, select');

  // Lặp qua từng phần tử input và select để gắn sự kiện blur
  inputAndSelectFields.forEach(function(field) {
      field.addEventListener('blur', function() {
          validateForm();
      });
  });
  // Lấy tất cả các thẻ a có class "dob" hoặc "gender"
  var linkElements = document.querySelectorAll('a.dob, a.gender');

  // Lặp qua từng thẻ a và thêm sự kiện 'click'
  linkElements.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

      // Lấy tên class tương ứng của thẻ a
      var className = link.classList[1]; // Lấy class thứ hai, tức là "dob" hoặc "gender"

      // Lấy phần tử img tương ứng
      var imgElement = document.querySelector('.img.' + className);
      if (imgElement.style.display !== 'none') {
        // Ẩn phần tử img
        imgElement.style.display = 'none';

        var errorField = document.querySelector('.' + className + '.errorField');
        errorField.style.display = 'block';
        console.log(errorField);

      }

    });
  });
  // Lặp qua từng thẻ a và thêm sự kiện 'blur'
  linkElements.forEach(function (link) {
    link.addEventListener('blur', function () {
      // Lấy tên class tương ứng của thẻ a
      var className = link.classList[1]; // Lấy class thứ hai, tức là "dob" hoặc "gender"

      // Lấy phần tử img tương ứng
      var imgElement = document.querySelector('.img.' + className);

      if (!validateForm()) {
        // Hiển thị lại phần tử img
      imgElement.style.display = 'inline-block';
      
      // Ẩn đi phần tử errorField tương ứng (giả sử errorField có class là 'errorField')
      var errorField = document.querySelector('.' + className + '.errorField');
      errorField.style.display = 'none';
      console.log(errorField);
      }
    });
  });



});




