// A helper function to add a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses based on your description
// Simulates: https://railjournal.in/RailRadar/ for grabbing train and loco details
const mockFetchAllActiveLocos = async () => {
    console.log("Fetching master list of all active locos...");
    // In a real scenario, this would be an HTTP request.
    // This should return an array of loco IDs, e.g., [22201, 22202, ..., 30201]
    // Let's generate a list of 20 mock locos for this example.
    const locos = Array.from({ length: 20 }, (_, i) => 30201 + i);
    return locos;
};

// Simulates: https://fois.indianrail.gov.in/foisweb/GG_AjaxInteraction?Optn=RTIS_CURRENT_LOCO_RPTG&Loco=${locoId}
const mockFetchLocoData = async (locoId) => {
    // This function simulates fetching data for a single loco.
    // The response is a string that needs parsing.
    const mockResponse = `1^${locoId}^28.5839,77.2341^12527^85 KMPH^DEPARTED^Sadar Bazar(DSB)^17-07-2024 14:35:10`;

    // Parse the response string
    const parts = mockResponse.split('^');
    if (parts.length < 7) {
        return null; // Invalid data
    }

    const [lat, lon] = parts[2].split(',').map(Number);

    // A simple date parser for "DD-MM-YYYY HH:mm:ss"
    const [datePart, timePart] = parts[6].split(' ');
    const [day, month, year] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');
    const timestamp = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);


    return {
        loco_no: parseInt(parts[1]),
        latitude: lat,
        longitude: lon,
        train_no: parseInt(parts[3]) || null,
        speed: parseInt(parts[4]),
        event: parts[5],
        station: parts[6],
        timestamp: timestamp,
    };
};