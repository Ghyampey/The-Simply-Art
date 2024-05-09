export const formatDataForCharts = (data) => {
    console.log(data,"ddaattaa")
    const formattedData = [];
    const cumulativeDataByMonth = {};

    // Find the minimum and maximum dates from the artist data
    const dates = data.map((data) => new Date(data.createdAt));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    // Generate all months between the minimum and maximum dates
    const currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
        const month = currentDate.toLocaleString("en-US", {
            month: "short",
        });
        const year = currentDate.getFullYear();
        const monthYear = `${month} ${year}`;

        cumulativeDataByMonth[monthYear] = 0;

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Accumulate the artist count for each month
    data.forEach((data) => {
        const createdAt = new Date(data.createdAt);
        const month = createdAt.toLocaleString("en-US", { month: "short" });
        const year = createdAt.getFullYear();
        const monthYear = `${month} ${year}`;

        cumulativeDataByMonth[monthYear] += 1;
    });

    Object.entries(cumulativeDataByMonth).forEach(
        ([monthYear, data]) => {
            formattedData.push({ monthYear, data });
        }
    );

    return formattedData;
};