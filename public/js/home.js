$(document).ready(function() {
    getDataList();

    $(".btn-submit").on("click", function() {
        submitData($(this));
    })
});

function submitData(elm) {
    let formDataArray = $("#form_elm").serializeArray();
    let formDataObject = {};
    formDataArray.forEach(function(item) {
        formDataObject[item.name] = item.value;
    });

    $.ajax({
        url: BASE_URL + "api/news",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(formDataObject),
        success: function(res) {
            console.log(res.message);
        },
        error: function(err) {
            console.error('Error adding data:', err);
        }
    });
}

function deleteData(id) {
    $.ajax({
        url: BASE_URL + "api/news/" + id,
        type: 'DELETE',
        success: function(res) {
            console.log(res.message); // แสดงข้อความยืนยัน
        },
        error: function(err) {
            console.error('Error deleting data:', err);
        }
    });
}

function getDataList() {
    $.ajax({
        url: BASE_URL + "api/news",
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function(res) {
            console.log(res);
            renderDataList(res.data);
        },
        error: function(err) {
            console.error('Error fetching data:', err);
        }
    });
}

function renderDataList(data) {
    var dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // ล้างข้อมูลเก่า

    if (data.length > 0) {
        data.forEach(function(item) {
            dataList.innerHTML += `<div>${item.eng_name} (${item.email})</div>`;
        });
    } else {
        dataList.innerHTML = '<div>No data found.</div>';
    }
}
