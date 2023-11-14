$(document).ready(function() {
    $('#bmiForm').submit(function(event) {
        event.preventDefault();

        var height = parseFloat($('#height').val());
        var weight = parseFloat($('#weight').val());
        var bmi = weight / Math.pow(height / 100, 2);
        var bmiFixed = bmi.toFixed(2);

        displayBMIResult(bmiFixed);

        // Sunucuya veri gönderme
        $.ajax({
            url: 'http://localhost:3000/bmi',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ height, weight, bmi: bmiFixed }),
            success: function(response) {
                console.log('Sunucu yanıtı:', response);
            },
            error: function(error) {
                console.error('Hata:', error);
            }
        });
    });
});

function displayBMIResult(bmi) {
    var resultText = `Hesaplanan BMI: ${bmi}<br>`;

    if (bmi < 18.5) {
        resultText += 'Durum: Zayıf';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultText += 'Durum: Normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        resultText += 'Durum: Kilolu';
    } else if (bmi >= 30) {
        resultText += 'Durum: Obez';
    }

    $('#result').html(resultText);
}