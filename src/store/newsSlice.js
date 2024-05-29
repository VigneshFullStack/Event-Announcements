import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StatusCode from '../utils/StatusCode';

const initialState = {
    data: [
        {
            "formatedDate": "12/8/2021 8:38",
            "_date": "12/8/2021 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 13730,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2021 8:38"
        },
        {
            "formatedDate": "11/9/2021 4:00",
            "_date": "11/9/2021 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 13726,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2021 4:00"
        },
        {
            "formatedDate": "12/8/2021 8:38",
            "_date": "12/8/2021 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 13729,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2021 8:38"
        },
        {
            "formatedDate": "11/9/2021 4:00",
            "_date": "11/9/2021 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 13725,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2021 4:00"
        },
        {
            "formatedDate": "10/20/2021 7:42",
            "_date": "10/20/2021 7:42",
            "title": "Volvo Group - the Third Quarter 2021",
            "type": "Earnings",
            "ID": 13722,
            "hasAttachments": false,
            "TypeID": 111,
            "SourceID": 9,
            "date": "10/20/2021 7:42"
        },
        {
            "formatedDate": "11/30/2021 13:22",
            "_date": "11/30/2021 13:22",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 13728,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "11/30/2021 13:22"
        },
        {
            "formatedDate": "12/8/2022 8:38",
            "_date": "12/8/2022 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137302,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2022 8:38"
        },
        {
            "formatedDate": "11/30/2022 13:22",
            "_date": "11/30/2022 13:22",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 13727,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "11/30/2022 13:22"
        },
        {
            "formatedDate": "12/8/2022 8:38",
            "_date": "12/8/2022 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137294,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2022 8:38"
        },
        {
            "formatedDate": "10/31/2022 16:17",
            "_date": "10/31/2022 16:17",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 13723,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "10/31/2022 16:17"
        },
        {
            "formatedDate": "12/8/2022 8:38",
            "_date": "12/8/2022 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137304,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2022 8:38"
        },
        {
            "formatedDate": "10/31/2022 16:17",
            "_date": "10/31/2022 16:17",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 13724,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "10/31/2022 16:17"
        },
        {
            "formatedDate": "12/8/2022 8:38",
            "_date": "12/8/2022 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137291,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2022 8:38"
        },
        {
            "formatedDate": "11/9/2023 4:00",
            "_date": "11/9/2023 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 137262,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2023 4:00"
        },
        {
            "formatedDate": "12/31/2023 15:51",
            "_date": "12/31/2023 15:51",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 13731,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "12/31/2023 15:51"
        },
        {
            "formatedDate": "11/9/2023 4:00",
            "_date": "11/9/2023 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 137253,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2023 4:00"
        },
        {
            "formatedDate": "10/20/2023 7:42",
            "_date": "10/20/2023 7:42",
            "title": "Volvo Group - the Third Quarter 2023",
            "type": "Earnings",
            "ID": 137226,
            "hasAttachments": false,
            "TypeID": 111,
            "SourceID": 9,
            "date": "10/20/2023 7:42"
        },
        {
            "formatedDate": "11/30/2023 13:22",
            "_date": "11/30/2023 13:22",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137272,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "11/30/2023 13:22"
        },
        {
            "formatedDate": "10/31/2023 16:17",
            "_date": "10/31/2023 16:17",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137231,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "10/31/2023 16:17"
        },
        {
            "formatedDate": "12/8/2024 8:38",
            "_date": "12/8/2024 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137305,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2024 8:38"
        },
        {
            "formatedDate": "10/31/2024 16:17",
            "_date": "10/31/2024 16:17",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137242,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "10/31/2024 16:17"
        },
        {
            "formatedDate": "12/8/2024 8:38",
            "_date": "12/8/2024 8:38",
            "title": "Martin Weissburg Appointed President of Mack Trucks",
            "type": "Personnel Announcements",
            "ID": 137292,
            "hasAttachments": false,
            "TypeID": 132,
            "SourceID": 9,
            "date": "12/8/2024 8:38"
        },
        {
            "formatedDate": "10/20/2024 7:42",
            "_date": "10/20/2024 7:42",
            "title": "Volvo Group - the Third Quarter 2024",
            "type": "Earnings",
            "ID": 137221,
            "hasAttachments": false,
            "TypeID": 111,
            "SourceID": 9,
            "date": "10/20/2024 7:42"
        },
        {
            "formatedDate": "12/31/2024 15:51",
            "_date": "12/31/2024 15:51",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137313,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "12/31/2024 15:51"
        },
        {
            "formatedDate": "11/30/2024 13:22",
            "_date": "11/30/2024 13:22",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137287,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "11/30/2024 13:22"
        },
        {
            "formatedDate": "11/9/2024 4:00",
            "_date": "11/9/2024 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 137216,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2024 4:00"
        },
        {
            "formatedDate": "12/31/2024 15:51",
            "_date": "12/31/2024 15:51",
            "title": "New Number of Votes in AB Volvo",
            "type": "Accounting news, issues",
            "ID": 137310,
            "hasAttachments": false,
            "TypeID": 103,
            "SourceID": 9,
            "date": "12/31/2024 15:51"
        },
        {
            "formatedDate": "11/9/2024 4:00",
            "_date": "11/9/2024 4:00",
            "title": "Smart Societies of the Future in Focus at the Next Volvo Group Innovation Summit",
            "type": "Trade shows",
            "ID": 137236,
            "hasAttachments": false,
            "TypeID": 134,
            "SourceID": 9,
            "date": "11/9/2024 4:00"
        }
    ],
    status: StatusCode.IDLE
};

// export const getNews = createAsyncThunk('news/get', async () => {
//     try {
//         console.log('Fetching data...');
//         const response = await fetch('https://fakestoreapi.com/products');
//         console.log('response:', response);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         console.log('Data fetched successfully:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw new Error('Failed to fetch data');
//     }
// });

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getNews.pending, (state, action) => {
    //             state.status = StatusCode.LOADING;
    //         })
    //         .addCase(getNews.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = StatusCode.IDLE;
    //         })
    //         .addCase(getNews.rejected, (state, action) => {
    //             state.status = StatusCode.ERROR;
    //         })
    // }
});

export default newsSlice.reducer;
