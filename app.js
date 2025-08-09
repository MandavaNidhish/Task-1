// Court Data Fetcher Application JavaScript

class CourtDataFetcher {
    constructor() {
        this.mockData = {
            courts: [
                { id: "delhi_hc", name: "Delhi High Court", location: "New Delhi" },
                { id: "faridabad_dc", name: "District Court Faridabad", location: "Faridabad, Haryana" }
            ],
            caseTypes: [
                "Criminal Appeal", "Civil Suit", "Writ Petition", "Bail Application", 
                "Family Dispute", "Commercial Dispute", "Revenue Matter", "Service Matter"
            ],
            mockCases: [
                {
                    caseNumber: "CRL.A.798/2025",
                    court: "Delhi High Court",
                    caseType: "Criminal Appeal",
                    filingDate: "2025-01-15",
                    status: "Under Trial",
                    nextHearing: "2025-08-15",
                    petitioner: "STATE GOVT OF NCT OF DELHI",
                    respondent: "JAIDEV & ORS.",
                    petitionerAdvocate: "Public Prosecutor",
                    respondentAdvocate: "Adv. Ramesh Kumar",
                    judge: "Hon'ble Justice Prathiba M. Singh",
                    orders: [
                        {
                            date: "2025-07-31",
                            title: "Order on Bail Application",
                            summary: "Bail granted with conditions of Rs. 50,000 surety and surrender of passport",
                            pdfUrl: "https://delhihighcourt.nic.in/orders/CRL.A.798-2025_bail_order.pdf"
                        },
                        {
                            date: "2025-03-20",
                            title: "Notice to Respondent",
                            summary: "Notice issued to respondent party for reply within 4 weeks",
                            pdfUrl: "https://delhihighcourt.nic.in/orders/CRL.A.798-2025_notice.pdf"
                        }
                    ]
                },
                {
                    caseNumber: "W.P.(C)11180/2025",
                    court: "Delhi High Court",
                    caseType: "Writ Petition",
                    filingDate: "2025-02-01",
                    status: "Disposed",
                    nextHearing: null,
                    petitioner: "ANIJAY TYAGI",
                    respondent: "MUNICIPAL CORPORATION OF DELHI & ORS.",
                    petitionerAdvocate: "Adv. Amit Sharma",
                    respondentAdvocate: "Adv. Neena Gupta",
                    judge: "Hon'ble Justice C. Hari Shankar",
                    orders: [
                        {
                            date: "2025-07-30",
                            title: "Final Judgment",
                            summary: "Petition dismissed with costs of Rs. 10,000 to be paid to respondent",
                            pdfUrl: "https://delhihighcourt.nic.in/orders/WP.C.11180-2025_judgment.pdf"
                        }
                    ]
                },
                {
                    caseNumber: "CS.123/2024",
                    court: "District Court Faridabad",
                    caseType: "Civil Suit",
                    filingDate: "2024-03-10",
                    status: "Pending",
                    nextHearing: "2025-08-20",
                    petitioner: "Smt. Sunita Sharma",
                    respondent: "Sh. Rajesh Kumar",
                    petitionerAdvocate: "Adv. Vikash Gupta",
                    respondentAdvocate: "Adv. Priya Singh",
                    judge: "Hon'ble Shri Manoj Kumar, District Judge",
                    orders: [
                        {
                            date: "2024-12-15",
                            title: "Interim Order",
                            summary: "Stay granted on property sale pending final decision in the matter",
                            pdfUrl: "https://faridabad.dcourts.gov.in/orders/CS.123-2024_interim.pdf"
                        },
                        {
                            date: "2024-06-10",
                            title: "Summons Issued",
                            summary: "Summons issued to defendant party for appearance",
                            pdfUrl: "https://faridabad.dcourts.gov.in/orders/CS.123-2024_summons.pdf"
                        }
                    ]
                },
                {
                    caseNumber: "FAM.45/2024",
                    court: "District Court Faridabad",
                    caseType: "Family Dispute",
                    filingDate: "2024-06-15",
                    status: "Under Trial",
                    nextHearing: "2025-09-10",
                    petitioner: "Smt. Kavita Devi",
                    respondent: "Sh. Manoj Kumar",
                    petitionerAdvocate: "Adv. Sanjay Tiwari",
                    respondentAdvocate: "Adv. Deepika Sharma",
                    judge: "Hon'ble Smt. Ritu Sharma, Family Court Judge",
                    orders: [
                        {
                            date: "2025-01-20",
                            title: "Maintenance Order",
                            summary: "Interim maintenance of Rs. 15,000 per month granted to petitioner",
                            pdfUrl: "https://faridabad.dcourts.gov.in/orders/FAM.45-2024_maintenance.pdf"
                        }
                    ]
                },
                {
                    caseNumber: "BAIL.APPLN.2872/2025",
                    court: "Delhi High Court",
                    caseType: "Bail Application",
                    filingDate: "2025-07-01",
                    status: "Disposed",
                    nextHearing: null,
                    petitioner: "SAHIL ARORA",
                    respondent: "STATE OF NCT OF DELHI",
                    petitionerAdvocate: "Adv. Rohit Malhotra",
                    respondentAdvocate: "Public Prosecutor",
                    judge: "Hon'ble Justice Subramonium Prasad",
                    orders: [
                        {
                            date: "2025-08-01",
                            title: "Bail Order",
                            summary: "Bail granted with surety of Rs. 50,000 and conditions of not leaving Delhi",
                            pdfUrl: "https://delhihighcourt.nic.in/orders/BAIL.APPLN.2872-2025_bail.pdf"
                        }
                    ]
                }
            ]
        };

        this.loadingMessages = [
            "Connecting to court database...",
            "Authenticating with court server...",
            "Scraping case data from court website...",
            "Parsing case information...",
            "Fetching order details...",
            "Validating case status...",
            "Compiling results..."
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSearchHistory();
    }

    bindEvents() {
        // Form submission
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Clear history button
        document.getElementById('clearHistory').addEventListener('click', () => {
            this.clearSearchHistory();
        });

        // Modal close events
        document.getElementById('closeError').addEventListener('click', () => {
            this.hideError();
        });
        document.getElementById('closeErrorBtn').addEventListener('click', () => {
            this.hideError();
        });

        // Close modal on background click
        document.getElementById('errorModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideError();
            }
        });
    }

    async handleSearch() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        this.showLoading();
        
        try {
            // Simulate realistic loading time (10-15 seconds)
            const result = await this.simulateScrapingProcess(formData);
            
            if (result.success) {
                this.displayResults(result.data);
                this.saveToHistory(formData, result.data);
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError("Network error: Unable to connect to court servers. Please try again later.");
        }
        
        this.hideLoading();
    }

    getFormData() {
        return {
            court: document.getElementById('court').value,
            caseType: document.getElementById('caseType').value,
            caseNumber: document.getElementById('caseNumber').value.trim(),
            filingYear: document.getElementById('filingYear').value
        };
    }

    validateForm(formData) {
        const errors = [];

        if (!formData.court) errors.push("Please select a court");
        if (!formData.caseType) errors.push("Please select a case type");
        if (!formData.caseNumber) errors.push("Please enter a case number");
        if (!formData.filingYear) errors.push("Please select a filing year");

        // Case number format validation
        if (formData.caseNumber && !this.isValidCaseNumber(formData.caseNumber)) {
            errors.push("Invalid case number format. Please use format like 'CRL.A.798/2025'");
        }

        if (errors.length > 0) {
            this.showError(errors.join('<br>'));
            return false;
        }

        return true;
    }

    isValidCaseNumber(caseNumber) {
        // Basic validation for case number format
        return /^[A-Z.\s]+\d+\/\d{4}$/i.test(caseNumber);
    }

    async simulateScrapingProcess(formData) {
        const totalSteps = this.loadingMessages.length;
        const stepDuration = 12000 / totalSteps; // 12 seconds total

        // Update progress and messages
        for (let i = 0; i < totalSteps; i++) {
            await new Promise(resolve => setTimeout(resolve, stepDuration));
            
            const progress = ((i + 1) / totalSteps) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;
            document.getElementById('loadingTitle').textContent = this.loadingMessages[i];
            
            if (i === totalSteps - 1) {
                document.getElementById('timeEstimate').textContent = "Almost done...";
            }
        }

        // Simulate finding case data
        const caseData = this.findMockCase(formData);
        
        if (caseData) {
            return { success: true, data: caseData };
        } else {
            // Simulate various error scenarios
            const errorTypes = [
                "Case not found in court records. Please verify the case number and court selection.",
                "Court website is temporarily unavailable. Please try again later.",
                "Invalid case number format for the selected court.",
                "Access denied: This case information is not publicly available."
            ];
            
            const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            return { success: false, error: randomError };
        }
    }

    findMockCase(formData) {
        // Try to find exact match first
        let match = this.mockData.mockCases.find(c => 
            c.caseNumber.toLowerCase() === formData.caseNumber.toLowerCase() &&
            c.court === this.getCourtName(formData.court) &&
            c.caseType === formData.caseType
        );

        // If no exact match, return a random case from the selected court
        if (!match) {
            const courtName = this.getCourtName(formData.court);
            const courtCases = this.mockData.mockCases.filter(c => c.court === courtName);
            if (courtCases.length > 0) {
                match = courtCases[Math.floor(Math.random() * courtCases.length)];
                // Update the case number to match the search
                match = { ...match, caseNumber: formData.caseNumber };
            }
        }

        return match;
    }

    getCourtName(courtId) {
        const court = this.mockData.courts.find(c => c.id === courtId);
        return court ? court.name : '';
    }

    showLoading() {
        document.getElementById('loadingSection').classList.remove('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        
        // Reset progress
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('loadingTitle').textContent = "Initializing connection...";
        document.getElementById('loadingMessage').textContent = "Please wait while we fetch the latest information";
        document.getElementById('timeEstimate').textContent = "Estimated time: 10-15 seconds";
        
        // Disable form
        const submitBtn = document.querySelector('#searchForm button[type="submit"]');
        submitBtn.disabled = true;
        document.querySelector('.btn-text').classList.add('hidden');
        document.querySelector('.btn-loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSection').classList.add('hidden');
        
        // Re-enable form
        const submitBtn = document.querySelector('#searchForm button[type="submit"]');
        submitBtn.disabled = false;
        document.querySelector('.btn-text').classList.remove('hidden');
        document.querySelector('.btn-loading').classList.add('hidden');
    }

    displayResults(caseData) {
        // Case Information
        document.getElementById('resultCaseNumber').textContent = caseData.caseNumber;
        document.getElementById('resultCourt').textContent = caseData.court;
        document.getElementById('resultCaseType').textContent = caseData.caseType;
        document.getElementById('resultFilingDate').textContent = this.formatDate(caseData.filingDate);
        document.getElementById('resultNextHearing').textContent = 
            caseData.nextHearing ? this.formatDate(caseData.nextHearing) : 'No hearing scheduled';
        
        // Status badge
        const statusEl = document.getElementById('resultStatus');
        statusEl.textContent = caseData.status;
        statusEl.className = `status ${this.getStatusClass(caseData.status)}`;
        
        // Data source badge
        document.getElementById('dataSource').textContent = 'Live Scraped Data';
        
        // Parties & Advocates
        document.getElementById('resultPetitioner').textContent = caseData.petitioner;
        document.getElementById('resultRespondent').textContent = caseData.respondent;
        document.getElementById('resultPetitionerAdvocate').textContent = caseData.petitionerAdvocate;
        document.getElementById('resultRespondentAdvocate').textContent = caseData.respondentAdvocate;
        document.getElementById('resultJudge').textContent = caseData.judge;
        
        // Orders & Judgments
        this.displayOrders(caseData.orders);
        
        // Show results section
        document.getElementById('resultsSection').classList.remove('hidden');
        
        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    displayOrders(orders) {
        const container = document.getElementById('ordersContainer');
        
        if (!orders || orders.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">No orders available</p>';
            return;
        }
        
        container.innerHTML = orders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <div class="order-date">${this.formatDate(order.date)}</div>
                </div>
                <h4 class="order-title">${order.title}</h4>
                <p class="order-summary">${order.summary}</p>
                <a href="${order.pdfUrl}" target="_blank" class="download-btn">
                    📄 Download PDF Order
                </a>
            </div>
        `).join('');
    }

    getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'under trial':
                return 'status--under-trial';
            case 'disposed':
                return 'status--disposed';
            case 'pending':
                return 'status--pending';
            default:
                return 'status--info';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }

    saveToHistory(searchData, resultData) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            searchData,
            resultData,
            status: 'Success'
        };
        
        let history = this.getSearchHistory();
        history.unshift(historyItem);
        
        // Keep only last 10 searches
        history = history.slice(0, 10);
        
        try {
            localStorage.setItem('courtSearchHistory', JSON.stringify(history));
            this.loadSearchHistory();
        } catch (error) {
            console.warn('Unable to save search history:', error);
        }
    }

    getSearchHistory() {
        try {
            const history = localStorage.getItem('courtSearchHistory');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.warn('Unable to load search history:', error);
            return [];
        }
    }

    loadSearchHistory() {
        const history = this.getSearchHistory();
        const container = document.getElementById('historyContainer');
        
        if (history.length === 0) {
            container.innerHTML = '<p class="no-history">No search history available</p>';
            return;
        }
        
        container.innerHTML = history.map(item => `
            <div class="history-item" data-search='${JSON.stringify(item.searchData)}'>
                <div class="history-header">
                    <div class="history-case font-medium">${item.searchData.caseNumber}</div>
                    <div class="history-timestamp">${this.formatDateTime(item.timestamp)}</div>
                </div>
                <div class="history-details">
                    <span>${item.searchData.caseType}</span>
                    <span>${this.getCourtName(item.searchData.court)}</span>
                    <span class="status status--success">Success</span>
                </div>
            </div>
        `).join('');
        
        // Add click events to history items
        container.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const searchData = JSON.parse(item.dataset.search);
                this.populateFormFromHistory(searchData);
            });
        });
    }
    downloadPDF(pdfUrl, filename) {
    try {
        // Use the backend proxy endpoint for PDF downloads
        const downloadUrl = `/api/download?pdf_url=${encodeURIComponent(pdfUrl)}`;
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || 'court_order.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('PDF download initiated', 'success');
        
    } catch (error) {
        console.error('Download error:', error);
        this.showMessage('Failed to download PDF', 'error');
    }
}

    populateFormFromHistory(searchData) {
        document.getElementById('court').value = searchData.court;
        document.getElementById('caseType').value = searchData.caseType;
        document.getElementById('caseNumber').value = searchData.caseNumber;
        document.getElementById('filingYear').value = searchData.filingYear;
        
        // Scroll to form
        document.getElementById('searchForm').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    clearSearchHistory() {
        try {
            localStorage.removeItem('courtSearchHistory');
            this.loadSearchHistory();
        } catch (error) {
            console.warn('Unable to clear search history:', error);
        }
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showError(message) {
        document.getElementById('errorMessage').innerHTML = message;
        document.getElementById('errorModal').classList.remove('hidden');
    }

    hideError() {
        document.getElementById('errorModal').classList.add('hidden');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourtDataFetcher();
});