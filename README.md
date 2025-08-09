# Court Data Fetcher & Mini-Dashboard

A complete web application that fetches and displays case metadata and latest orders/judgments from Indian courts using real-time web scraping.

## 🎯 Project Overview

This application provides:
- ✅ **Real-time web scraping** from Delhi High Court and Faridabad District Court
- ✅ **Professional web interface** with form-based case search
- ✅ **SQLite database** for query logging and data storage
- ✅ **PDF download functionality** for court orders/judgments
- ✅ **Search history** with persistent storage
- ✅ **Error handling** and user-friendly messages
- ✅ **CAPTCHA bypass strategies** with fallback mechanisms

## 🏛️ Supported Courts

### Delhi High Court
- **URL**: https://delhighcourt.nic.in/
- **Features**: Case search by type, number, and year
- **Data Extracted**: Parties, dates, orders, PDF links

### Faridabad District Court
- **URL**: https://faridabad.dcourts.gov.in/
- **Features**: District court case lookup
- **Data Extracted**: Complete case information with hearing dates

## 📁 Project Files

```
court-data-fetcher/
├── app.py              # Flask backend with real scraping
├── index.html          # Main web interface
├── style.css          # Professional styling
├── app.js             # Frontend JavaScript
├── requirements.txt   # Python dependencies
├── court_data.db     # SQLite database (created at runtime)
└── README.md         # This documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Internet connection for court website scraping

### Installation & Setup

1. **Download all project files** to a single directory

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Access the application**:
   ```
   Open your browser and navigate to: http://localhost:5000
   ```

## 💻 Usage Instructions

### 1. Search for Case Data
1. Open the application in your browser
2. Select a court from the dropdown (Delhi High Court or Faridabad District Court)
3. Choose the case type (Criminal Appeal, Civil Suit, Writ Petition, etc.)
4. Enter the case number (e.g., "CRL.A.798/2025")
5. Select the filing year
6. Click "Fetch Case Data (Real Scraping)"

### 2. View Results
The application displays:
- **Case Information**: Number, type, filing date, next hearing
- **Parties & Advocates**: Petitioner, respondent, judge details
- **Orders & Judgments**: List of court orders with download links
- **Data Source**: Shows whether data was scraped live or retrieved from database

### 3. Search History
- All searches are automatically saved to the database
- View previous searches in the history section
- Click on any historical search to view details

### 4. Download PDFs
- Click "Download PDF" buttons on court orders
- PDFs are proxied through the application for security

## 🕷️ Web Scraping Implementation

### How Real Scraping Works
1. **HTTP Requests**: Makes actual requests to court websites
2. **Form Processing**: Extracts and submits required form data
3. **HTML Parsing**: Extracts case data from court responses
4. **Data Storage**: Saves all results to SQLite database
5. **Error Recovery**: Provides fallback data when scraping fails

### CAPTCHA Handling
The application implements multiple strategies:
- **Detection**: Automatically identifies CAPTCHA challenges
- **OCR Processing**: Attempts to solve simple text CAPTCHAs
- **Fallback Data**: Provides realistic sample data when scraping fails
- **Transparent Messaging**: Informs users about scraping status

### Example Scraping Flow
```
User Input → Flask API → HTTP Request → Court Website
     ↓
Database Storage ← Data Processing ← HTML Response ← Court Server
     ↓
User Interface ← JSON Response ← Parsed Data ← Database Query
```

## 📊 Database Schema

The SQLite database includes three tables:

### `case_queries`
- Logs every search request with parameters and results
- Tracks success/failure status and error messages
- Enables search history functionality

### `case_data`
- Stores complete case information
- Includes parties, dates, status, and judge details
- Prevents duplicate scraping of same cases

### `case_orders`
- Stores court orders and judgments
- Links to parent case data
- Includes PDF URLs for downloads

## 🔌 API Endpoints

### `POST /api/search`
Search for case data with live scraping
```json
{
  "court_id": "delhi_hc",
  "case_type": "Criminal Appeal",
  "case_number": "CRL.A.798/2025", 
  "filing_year": 2025
}
```

### `GET /api/history`
Retrieve search history

### `GET /api/download/<pdf_url>`
Proxy PDF downloads from court websites

### `GET /api/health`
Health check endpoint

## 🛡️ Security & Legal Compliance

### Respectful Scraping
- **Request Delays**: Appropriate delays between requests
- **User Agent**: Proper identification in request headers
- **Error Handling**: Graceful failure when sites are unavailable
- **Rate Limiting**: Prevents overwhelming court servers

### Data Usage
- **Public Information Only**: Scrapes only publicly available case data
- **Educational Purpose**: Designed for legitimate legal research
- **No Commercial Use**: For educational and research purposes
- **Data Protection**: Secure handling of scraped information

## 🔧 Technical Features

### Backend (Flask)
- Real HTTP requests to court websites
- BeautifulSoup for HTML parsing  
- SQLite database with proper schema
- Comprehensive error handling and logging
- RESTful API endpoints

### Frontend (HTML/CSS/JavaScript)
- Professional government-style interface
- Responsive design for mobile and desktop
- Real-time form validation
- Loading states and progress indicators
- Search history management

### Database Integration
- Automatic table creation
- Query logging and audit trail
- Data persistence and caching
- Relationship management between tables

## 🧪 Testing & Validation

### Example Test Cases
```
Delhi High Court:
- CRL.A.798/2025 (Criminal Appeal)
- W.P.(C)11180/2025 (Writ Petition)
- BAIL.APPLN.2872/2025 (Bail Application)

Faridabad District Court:
- CS.123/2024 (Civil Suit)
- FAM.45/2024 (Family Dispute)
```

### Validation Steps
1. Start the application
2. Test case search with valid case numbers
3. Verify database storage of queries
4. Test error handling with invalid inputs
5. Check PDF download functionality

## 📋 Expected Behavior

### Successful Scraping
- Real data extracted from court websites
- Complete case information displayed
- PDF links for court orders available
- Data saved to database for future reference

### CAPTCHA Encountered
- System attempts automatic solving
- Falls back to sample data if unsolvable
- User informed about scraping status
- Realistic mock data provided for demonstration

### Network/Site Issues
- Graceful error handling
- User-friendly error messages
- Fallback to cached data if available
- Detailed logging for troubleshooting

## 🚨 Important Notes

### Real Scraping Limitations
- **CAPTCHA Challenges**: Some court websites use complex CAPTCHAs
- **Site Structure Changes**: Court websites may modify their layouts
- **Access Restrictions**: Some features may require authentication
- **Rate Limiting**: Courts may limit automated access

### Fallback Strategy
When live scraping fails, the application provides:
- Realistic sample data for demonstration
- Clear indication of data source
- Full functionality testing
- Educational value preservation

## 🎬 Demo Capabilities

This application is perfect for demonstration because it:
- **Shows real scraping attempts** with live HTTP requests
- **Handles various scenarios** including success and failure cases
- **Provides professional UI/UX** suitable for presentations
- **Documents all activities** in the database
- **Offers complete functionality** even when scraping fails

## 📞 Troubleshooting

### Common Issues

**"Plain page" or no styling:**
- Check that all files (index.html, style.css, app.js) are in the same directory
- Verify the Flask server is running on port 5000
- Clear browser cache and try again

**"Database errors":**
- Ensure write permissions in the application directory
- Check that SQLite is properly installed
- Restart the application to reinitialize database

**"Network errors during scraping":**
- Verify internet connectivity
- Check if court websites are accessible
- Review application logs for detailed error messages

**"Missing dependencies":**
- Run `pip install -r requirements.txt` again
- Ensure Python 3.8+ is installed
- Check for conflicting package versions

### Support Resources
- Check Flask application logs for detailed error information
- Verify all project files are present and correctly named
- Test with sample case numbers provided in documentation
- Review database contents using SQLite browser tools

## 📄 License

This project is provided for educational and research purposes. Please use responsibly and in accordance with the terms of service of the respective court websites.

---

**Ready to deploy and demonstrate! 🚀**

The application provides a complete implementation of the Court Data Fetcher requirements with real scraping capabilities, professional interface, and comprehensive functionality.
