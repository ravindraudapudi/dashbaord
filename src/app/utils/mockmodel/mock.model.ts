
export const DROPDOWNDATA = [
	{ name: 'Total Active Membership', code: 'TAM' },
	{ name: 'Paid Membership', code: 'PM' },
	{ name: 'Local Sponsored Membership', code: 'LSM' },
	{ name: 'Membership Revenue', code: 'RM' }
]

export const DROPDOWNCSV = [
	{ name: 'Distribution List', code: 'MD' },
	{ name: 'Transaction List', code: 'TL' },
	{ name: 'Profit & Loss sheet', code: 'PL' },
	// { name: 'Sponsorship List', code: 'SL' },
	{ name: 'Social Media List', code: 'SM' },
];

export const MEMBERDATA = [{
	"headers": {
		"chapterName": "Chapter",
		"period1": "FY 2017 Actual",
		"period2": "FY 2018 Actual",
		"goal": "FY 2019 Goal",
		"actual": "FY 2019 Actual",
		"percentage": "Achievable"
	},
	"columns": [{
		"chapter": "Atlanta",
		"FY16A": 55,
		"FY17A": 140,
		"FY18G": 165,
		"FY18A": 83,
		"change": "18%"
	},
	{
		"chapter": "Houston",
		"FY16A": 87,
		"FY17A": 141,
		"FY18G": 196,
		"FY18A": 120,
		"change": "39%"
	},
	{
		"chapter": "North Texas",
		"FY16A": 115,
		"FY17A": 187,
		"FY18G": 237,
		"FY18A": 144,
		"change": "27%"
	},
	{
		"chapter": "Charlotte",
		"FY16A": 10,
		"FY17A": 24,
		"FY18G": 80,
		"FY18A": 48,
		"change": "233%"
	},
	{
		"chapter": "New England",
		"FY16A": 44,
		"FY17A": 115,
		"FY18G": 100,
		"FY18A": 60,
		"change": "-13%"
	},
	{
		"chapter": "Philadelphia",
		"FY16A": 55,
		"FY17A": 87,
		"FY18G": 110,
		"FY18A": 121,
		"change": "26%"
	},
	{
		"chapter": "Seattle",
		"FY16A": 66,
		"FY17A": 67,
		"FY18G": 0,
		"FY18A": 47,
		"change": "-100%"
	},
	{
		"chapter": "Total",
		"FY16A": 432,
		"FY17A": 761,
		"FY18G": 888,
		"FY18A": 623,
		"change": "17%"
	}]
}]

export const REVENUEDATA = [{
	"headers": {
		"chapter": "Chapter",
		"FY16A": "FY 2016 Actual",
		"FY17A": "FY 2017 Actual",
		"FY18G": "FY 2018 Goal",
		"FY18A": "FY 2018 Actual",
		"change": "Achievable"
	},
	"columns": [{
		"chapter": "Atlanta",
		"FY16A": "$2,700",
		"FY17A": "$6,800",
		"FY18G": "$10,000",
		"FY18A": "$4,750",
		"change": "84%"
	},
	{
		"chapter": "Houston",
		"FY16A": "$7,925",
		"FY17A": "$15,575",
		"FY18G": "$19,313",
		"FY18A": "$6,621",
		"change": "55%"
	},
	{
		"chapter": "North Texas",
		"FY16A": "$11,250",
		"FY17A": "$16,255",
		"FY18G": "$15,000",
		"FY18A": "$7,370",
		"change": "15%"
	},
	{
		"chapter": "Charlotte",
		"FY16A": "$1,175",
		"FY17A": "$4,400",
		"FY18G": "$10,000",
		"FY18A": "$3,400",
		"change": "184%"
	},
	{
		"chapter": "New England",
		"FY16A": "$2,750",
		"FY17A": "$9,119",
		"FY18G": "$12,500",
		"FY18A": "$3,450",
		"change": "71%"
	},
	{
		"chapter": "Philadelphia",
		"FY16A": "$2,675",
		"FY17A": "$4,546",
		"FY18G": "$4,000",
		"FY18A": "$4,400",
		"change": "10%"
	},
	{
		"chapter": "Seattle",
		"FY16A": "$2,175",
		"FY17A": "$2,225",
		"FY18G": "$0",
		"FY18A": "$375",
		"change": ""
	},
	{
		"chapter": "Total",
		"FY16A": "$2,750",
		"FY17A": "$9,119",
		"FY18G": "$12,500",
		"FY18A": "$3,450",
		"change": "71%"
	}]
}]

export const ALLMEMBERS = [{
	name: "Alexander Ham",
	email: "alexander@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Google",
	expiryDate: "3/10/2017",
	amountPaid: "$150",
	action: ""
},
{
	name: "John Deo",
	email: "johndeo@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Microsoft",
	expiryDate: "3/10/2017",
	amountPaid: "$200",
	action: ""
},
{
	name: "Randy Orton",
	email: "ortan@gmail.com",
	phone: "+1234567890",
	status: "Active",
	company: "Facebook",
	expiryDate: "3/10/2017",
	amountPaid: "$300",
	action: ""
},
{
	name: "Alexander Ham",
	email: "alexander@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Twitter",
	expiryDate: "3/10/2017",
	amountPaid: "$150",
	action: ""
},
{
	name: "Alexander George",
	email: "alexa@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Pepsi Co",
	expiryDate: "3/10/2017",
	amountPaid: "$150",
	action: ""
},
{
	name: "John Deo",
	email: "johndeo@gmail.com",
	phone: "+1234567890",
	status: "Active",
	company: "Frito Lay",
	expiryDate: "3/10/2017",
	amountPaid: "$200",
	action: ""
},
{
	name: "Randy Orton",
	email: "randy@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "BEA",
	expiryDate: "3/10/2017",
	amountPaid: "$300",
	action: ""
},
{
	name: "John Deo",
	email: "johndeo@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Ascend",
	expiryDate: "3/10/2017",
	amountPaid: "$200",
	action: ""
},
{
	name: "Randy Orton",
	email: "ortan@gmail.com",
	phone: "+1234567890",
	status: "Active",
	company: "Google",
	expiryDate: "3/10/2017",
	amountPaid: "$300",
	action: ""
},
{
	name: "Randy Orton",
	email: "alexander@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Twitter",
	expiryDate: "3/10/2017",
	amountPaid: "$150",
	action: ""
},
{
	name: "Alexander More",
	email: "alexa@gmail.com",
	phone: "+1234567890",
	status: "Expired",
	company: "Lucida",
	expiryDate: "3/10/2017",
	amountPaid: "$150",
	action: ""
},
{
	name: "John cena",
	email: "johndeo@gmail.com",
	phone: "+1234567890",
	status: "Active",
	company: "Patanjali",
	expiryDate: "3/10/2017",
	amountPaid: "$200",
	action: ""
}];

export const LCDATA = [{
	'key': "FY 2018",
	'values': [{
		'x': 0,
		'y': 12,
		'key': "Value1"
	},
	{
		'x': 1,
		'y': 86,
		'key': "Value2"

	},
	{
		'x': 2,
		'y': 42,
		'key': "Value3"
	},
	{
		'x': 3,
		'y': 50,
		'key': "Value4"
	},
	{
		'x': 4,
		'y': 20,
		'key': "Value5"
	},
	{
		'x': 5,
		'y': 65,
		'key': "Value6"
	},
	{
		'x': 6,
		'y': 110,
		'key': "Value7"

	},
	{
		'x': 7,
		'y': 70,
		'key': "Value8"
	},
	{
		'x': 8,
		'y': 23,
		'key': "Value9"
	},
	{
		'x': 9,
		'y': 10,
		'key': "Value10"
	},
	{
		'x': 10,
		'y': 99,
		'key': "Value11"
	},
	{
		'x': 11,
		'y': 85,
		'key': "Value12"
	}]
},
{
	'key': "FY 2019",
	'values': [{
		'x': 0,
		'y': 20,
		'key': "Value1"
	},
	{
		'x': 1,
		'y': 50,
		'key': "Value2"

	},
	{
		'x': 2,
		'y': 40,
		'key': "Value3"
	},
	{
		'x': 3,
		'y': 90,
		'key': "Value4"
	}]
}
];

export const SBCDATA = [
	{
		'key': 'Active Paid Members',
		'values': [
			{
				'name': 'FY2016',
				"value": 20
			},
			{
				'name': 'FY2017',
				"value": 50
			},
			{
				'name': 'FY2018',
				"value": 30
			}
		]
	},
	{
		'key': 'Local Sponsor Paid',
		'values': [
			{
				'name': 'FY2016',
				"value": 10
			},
			{
				'name': 'FY2017',
				"value": 56
			},
			{
				'name': 'FY2018',
				"value": 45
			}
		]
	},
	{
		'key': 'National Sponsor Paid',
		'values': [
			{
				'name': 'FY2016',
				"value": 47
			},
			{
				'name': 'FY2017',
				"value": 76
			},
			{
				'name': 'FY2018',
				"value": 35
			}
		]
	}
];

export const TOTALREVENUE = [
	{
		'key': 'Membership Revenue',
		'values': [
			{
				'name': 'FY2016',
				"value": 20
			},
			{
				'name': 'FY2017',
				"value": 50
			},
			{
				'name': 'FY2018',
				"value": 30
			}
		]
	},
	{
		'key': 'Program Revenue',
		'values': [
			{
				'name': 'FY2016',
				"value": 10
			},
			{
				'name': 'FY2017',
				"value": 56
			},
			{
				'name': 'FY2018',
				"value": 45
			}
		]
	},
	{
		'key': 'Event Registration',
		'values': [
			{
				'name': 'FY2016',
				"value": 47
			},
			{
				'name': 'FY2017',
				"value": 76
			},
			{
				'name': 'FY2018',
				"value": 35
			}
		]
	},
	{
		'key': 'Contribution Revenue',
		'values': [
			{
				'name': 'FY2016',
				"value": 47
			},
			{
				'name': 'FY2017',
				"value": 76
			},
			{
				'name': 'FY2018',
				"value": 35
			}
		]
	}
];

export const SBCDATA1 = [
	{
		"key": "Paid Memberships in FY 2018",
		"values": [
			{
				"name": "Oct-17",
				"value": 79
			},
			{
				"name": "Nov-17",
				"value": 104
			},
			{
				"name": "Dec-17",
				"value": 104
			},
			{
				"name": "Jan-18",
				"value": 40
			},
			{
				"name": "Feb-18",
				"value": 30
			},
			{
				"name": "Mar-18",
				"value": 67
			},
			{
				"name": "Apr-18",
				"value": 42
			},
			{
				"name": "May-18",
				"value": 50
			},
			{
				"name": "Jun-18",
				"value": 20
			},
			{
				"name": "Jul-18",
				"value": 34
			},
			{
				"name": "Aug-18",
				"value": 54
			},
			{
				"name": "Sep-18",
				"value": 71
			}
		]
	},
	{
		"key": "Paid Memberships Expired in FY 2018",
		"values": [
			{
				"name": "Oct-17",
				"value": 16
			},
			{
				"name": "Nov-17",
				"value": 47
			},
			{
				"name": "Dec-17",
				"value": 190
			},
			{
				"name": "Jan-18",
				"value": 80
			},
			{
				"name": "Feb-18",
				"value": 39
			},
			{
				"name": "Mar-18",
				"value": 61
			},
			{
				"name": "Apr-18",
				"value": 46
			},
			{
				"name": "May-18",
				"value": 90
			},
			{
				"name": "Jun-18",
				"value": 42
			},
			{
				"name": "Jul-18",
				"value": 67
			},
			{
				"name": "Aug-18",
				"value": 72
			},
			{
				"name": "Sep-18",
				"value": 43
			}
		],
	}
];

export const MBCDATA = [
	{
		"key": "Germany",
		"values": [
			{
				"name": "FY 2016",
				"value": 79
			},
			{
				"name": "FY 2017",
				"value": 104
			},
			{
				"name": "FY 2018",
				"value": 80
			}
		]
	},
	{
		"key": "United States",
		"values": [
			{
				"name": "FY 2016",
				"value": 40
			},
			{
				"name": "FY 2017",
				"value": 25
			},
			{
				"name": "FY 2018",
				"value": 34
			}
		]
	},
	{
		"key": "France",
		"values": [
			{
				"name": "FY 2016",
				"value": 36
			},
			{
				"name": "FY 2017",
				"value": 58
			},
			{
				"name": "FY 2018",
				"value": 30
			}
		]
	}];

export const USERROLE = [
	{
		name: 'Admin',
		id: 1
	},
	{
		name: 'User',
		id: 2
	}
];

export const CHAPTERROLE = [
	{
		name: 'Atlanta',
		id: 1
	},
	{
		name: 'Houston',
		id: 2
	},
	{
		name: 'North Texas',
		id: 3
	},
	{
		name: 'Charlotte',
		id: 4
	},
	{
		name: 'New England',
		id: 5
	},
	{
		name: 'Philadelphia',
		id: 6
	},
	{
		name: 'Seattle',
		id: 7
	}
];

export const METRICS = [{
	"headers": {
		"metrics": " ",
		"period1": "FY 2016 Actual 15 Mths",
		"period2": "FY 2018 Goal 12 Mths",
		"period3": "FYTD 2018 Actual YTD",
		"comments": "Comments"
	},
	"columns": [{
		"metrics": "Active members",
		"period1": "187",
		"period2": "237",
		"period3": "144",
		"comments": "Goal +63%"
	},
	{
		"metrics": "Paid** new or renewed",
		"period1": "129",
		"period2": "180",
		"period3": "114",
		"comments": "Goal +40%"
	},
	{
		"metrics": "Expiration rate of member-paid memberships",
		"period1": "62% (57 expired)",
		"period2": "?",
		"period3": "49% (51 expired)",
		"comments": " "
	},
	{
		"metrics": "Membership revenue",
		"period1": "$16,255",
		"period2": "15,000",
		"period3": "$7,370",
		"comments": "Goal +15%"
	},
	{
		"metrics": "Event registration",
		"period1": "$4,306",
		"period2": " ",
		"period3": "$5,194",
		"comments": " "
	},
	{
		"metrics": "Sponsorship & program revenue",
		"period1": "$42,455",
		"period2": "38,000",
		"period3": "$13,736",
		"comments": " "
	},
	{
		"metrics": "Total revenue",
		"period1": "$63,016",
		"period2": "60,000",
		"period3": "$26,300",
		"comments": "Goal +5%"
	}]
}]

export const EVENTS = [{
	"headers": {
		"eventName": "Event Name",
		"date": "Date",
		"invited": "Invited",
		"regidtered": "Registered",
		"attended": "Attended"
	},
	"columns": [{
		"eventName": "Chit Chat with Ascend Exec Board",
		"date": "Sept 30, 2017",
		"invited": "59",
		"regidtered": "50",
		"attended": "45"
	},
	{
		"eventName": "Halloween Party",
		"date": "Oct 31, 2017",
		"invited": "75",
		"regidtered": "60",
		"attended": "51"
	},
	{
		"eventName": "Leadership Brunch and Workshop",
		"date": "Mar 14, 2017",
		"invited": "23",
		"regidtered": "20",
		"attended": "15"
	}]
}]

export const distrubutionColumns =
	["API_GUID", "Registration_Date", "Last_Updated",
		"Date_Membership_Expires", "Membership", "Member_Type_Code", "Primary_Group_Code",
		"First_Name", "Middle_Name", "Last_Name", "Member_Name_Title",
		"Email_Address", "Email_Address_Alternate", "Email_Bounced",
		"Home_City", "Home_Location", "Home_State_Abbrev",
		"Home_Postal_Code", "Home_Country", "Home_Phone_Area_Code", "Home_Phone", "Mobile_Area_Code",
		"Mobile", "Employer_Name", "Professional_Title", "Profession", "Employer_City",
		"Employer_Location", "Employer_State_Abbrev", "Employer_Postal_Code", "Employer_Country", "Employer_Phone_Area_Code",
		"Employer_Phone", "Date_Last_Renewed"]

export const sponsorshipColumns =
["Sponsorship_Id", "Sponsor", "Source", "Primary_Group_Code", "Amount", "Invoice_Number", "Invoice_Date", "Agreement_End_Date", "Accounting_Year", "Promotional_Code", "Memberships_Issued", "Memberships_Redeemed", "Memberships_Unused", "Expiration_Date_of_Code", "Contract_Terms", "National_Benefit?", "Relationship_With_National?", "Chapter_Contact", "Sponsor_Contact", "Type"]

export const transactionColumns =
	["Transaction_ID", "Payment_Type", "Date_Processed", "Amount",
		"Member_API_GUID", "Promotional_Code", "Member_Primary_Group", "First_Name",
		"Last_Name", "Email", "Current_Membership",
		"Current_Membership_Exp_Date", "Organization", "Date_Member_Signup"]

export const socialMediaColumns = ["Chapter", "Monthly_Date",
	"Distribution_List", "Facebook_Page", "LinkedIn_Page", "Instagram_Page"]

export const profitAndLoss = ["Ascend chapter Name", "Fiscal year details Ex:October 2019"]