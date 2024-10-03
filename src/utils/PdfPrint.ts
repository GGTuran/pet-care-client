import jsPDF from "jspdf";
// Predefined feeding chart data
const feedingChartData = {
    toy: [
        { weight: 3, cups: 0.33, calories: 139 },
        { weight: 6, cups: 0.5, calories: 233 },
    ],
    small: [
        { weight: 10, cups: 0.75, calories: 342 },
        { weight: 15, cups: 1, calories: 464 },
        { weight: 20, cups: 1.25, calories: 576 },
    ],
    medium: [
        { weight: 30, cups: 1.75, calories: 781 },
        { weight: 40, cups: 2.25, calories: 969 },
        { weight: 50, cups: 2.75, calories: 1145 },
    ],
    large: [
        { weight: 60, cups: 3, calories: 1313 },
        { weight: 70, cups: 3.5, calories: 1474 },
        { weight: 80, cups: 3.75, calories: 1629 },
        { weight: 90, cups: 4.25, calories: 1926 },
    ],
};

// Function to find the appropriate category and corresponding data
function getFeedingData(weight) {
    if (weight <= 6) {
        return { size: "Toy", data: feedingChartData.toy };
    } else if (weight <= 20) {
        return { size: "Small", data: feedingChartData.small };
    } else if (weight <= 50) {
        return { size: "Medium", data: feedingChartData.medium };
    } else {
        return { size: "Large", data: feedingChartData.large };
    }
}

// Function to dynamically generate the PDF based on provided age and weight
export function handleUserTestReportPdf({ age, weight }) {
    // Get the appropriate feeding data based on weight
    const { size, data } = getFeedingData(weight);

    // Find the exact feeding guideline based on weight
    const feedingInfo = data.find(item => weight <= item.weight) || data[data.length - 1];

    // Initialize jsPDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text("Recommended Daily Feeding Chart for Adult Dogs", 15, 20);

    // Subtitle
    doc.setFontSize(12);
    doc.text(
        "Use a standard 8 oz measuring cup. The data in this chart provides general feeding guidelines for domestic dogs.\nPlease consult your veterinarian for breed-specific nutritional guidance.",
        15, 30
    );

    // Pet Age and Weight Info
    doc.setFontSize(14);
    doc.text(`Pet Age: ${age} years`, 15, 45);
    doc.text(`Dog Size: ${size}`, 15, 55);
    doc.text(`Dog Weight: ${weight} lbs`, 15, 65);

    // Feeding Info
    doc.setFontSize(14);
    doc.text(`Cups per Day: ${feedingInfo.cups}`, 15, 75);
    doc.text(`Calories per Day: ${feedingInfo.calories}`, 15, 85);

    // Save the PDF
    doc.save("dog_feeding_chart.pdf");



};

export const handleUserAppointmentsPdf = (data, user) => {
    const doc = new jsPDF();
    // Adding the text
    doc.setFontSize(25);
    doc.text("DiagnoEase", 20, 20);

    doc.setFontSize(12);
    doc.text("Accurate | Caring | Instant", 20, 27);

    doc.setFontSize(10);
    doc.text("1240, Zakir Hossain Road, East Nasirabad", 20, 35);
    doc.text("Chittagong, Chittagong.", 20, 41);

    // Adding contact information
    doc.setFontSize(10);
    doc.text(" +8801707856409", 150, 20);
    doc.text(" hosan@DiagnoEase.com", 150, 25);

    // Break Line
    doc.setLineWidth(1);
    doc.line(5, 45, 205, 45);

    // User Test Info
    doc.setFontSize(15);
    doc.text(`${user.name}`, 20, 55);
    doc.setFontSize(12);
    doc.text(`Blood Group: ${user.bloodGroup}`, 20, 60);
    doc.text(`Address: ${user.upazila}, ${user.district}`, 20, 65);

    // Break Line
    doc.setLineWidth(1);
    doc.line(5, 70, 205, 70);

    // Appointments Report Heading
    doc.setFontSize(20);
    doc.text("Appointments ", 110, 80, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(10, 85, 195, 85);

    //
    let y = 90;
    const yAxis = () => {
        y += 5;
        return y;
    };
    doc.setFontSize(12);
    data.map((app) => {
        doc.text(`${app.testData.name}`, 20, yAxis());
        doc.text(`Price: ${app.testData.price}`, 20, yAxis());
        doc.text(`Transaction ID: ${app.transactionId}`, 20, yAxis());
        doc.text(`Test Status: ${app.status}`, 20, yAxis());
        if (app.status === "delivered") {
            doc.text(
                `Delivery Date: ${new Date(
                    app.resultDeliveryDate
                ).toLocaleDateString()}`,
                20,
                yAxis()
            );
            doc.text(`Report: ${app.result}`, 20, yAxis());
            yAxis();
        } else {
            doc.text(
                `Appointment Date: ${new Date(app.testData.date).toLocaleDateString()}`,
                20,
                yAxis()
            );
        }
        doc.setLineWidth(0.5);
        doc.line(20, yAxis(), 185, y);
    });

    doc.save(`${user.name}'s Appointments Summary`);

    // 	const string = doc.output("bloburl");
    // 	const iframe = `<iframe width='100%' height='100%' src='${string}'></iframe>`;
    // 	const x = window.open();
    // 	x.document.open();
    // 	x.document.write(iframe);
    // 	x.document.close();
};
