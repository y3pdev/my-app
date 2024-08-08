$(document).ready(function() {
    // ฟังก์ชันแก้ไขข้อมูล
    $('.edit').on('click', function() {
        const id = $(this).data('id');
        const eng_name = $(this).data('eng_name');
        const thai_name = $(this).data('thai_name');
        const email = $(this).data('email');
        const newEngName = prompt('Enter new English name:', eng_name);
        const newThaiName = prompt('Enter new Thai name:', thai_name);
        const newEmail = prompt('Enter new email:', email);
        if (newEngName && newThaiName && newEmail) {
            $.ajax({
                url: `/profile/${id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ eng_name: newEngName, thai_name: newThaiName, email: newEmail }),
                success: function(response) {
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error('Error updating profile:', error);
                }
            });
        }
    });

    // ฟังก์ชันลบข้อมูล
    $('.delete').on('click', function() {
        const id = $(this).data('id');
        if (confirm('Are you sure you want to delete this profile?')) {
            $.ajax({
                url: `/profile/${id}`,
                method: 'DELETE',
                success: function(response) {
                    location.reload();
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting profile:', error);
                }
            });
        }
    });
});