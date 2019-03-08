'use strict'
module.exports = {
    splitPattern: / *, */,
/*
AZKABAN CONFIGURATION
*/
    AZKABAN : {
        host: (process.env.AZKABAN_HOST) ? process.env.AZKABAN_HOST : 'ssrs1.vn',
        port: (process.env.AZKABAN_PORT) ? process.env.AZKABAN_PORT : '8081',
        protocol: (process.env.AZKABAN_PROTOCOL) ? process.env.AZKABAN_PROTOCOL : 'http',
        project: (process.env.AZKABAN_PROJECT) ?  process.env.AZKABAN_PROJECT : 'SSRS_FactOrders_Dev',
        concurrentOption: (process.env.AZKABAN_CONCURRENT) ? process.env.AZKABAN_CONCURRENT  : 'skip',
        pipelineLevel: (process.env.AZKABAN_PIPELINE_LEVEL) ? process.env.AZKABAN_PIPELINE_LEVEL  : '1',
        username: (process.env.AZKABAN_USERNAME) ? process.env.AZKABAN_USERNAME : 'username',
        password: (process.env.AZKABAN_PASSWORD) ? process.env.AZKABAN_PASSWORD : 'password',
    },
/*
FDS CONFIGURATION
*/
    FDS: {
        host: (process.env.FDS_DB_HOST) ?  process.env.FDS_DB_HOST : 'ssrs3.vn',
        port: (process.env.FDS_DB_PORT) ?  process.env.FDS_DB_PORT : '3306',
        database: (process.env.FDS_DB) ?  process.env.FDS_DB : 'fds',
        user: (process.env.FDS_DB_USER) ?  process.env.FDS_DB_USER : 'hungbv2',
        password: (process.env.FDS_DB_PASSWORD) ?  process.env.FDS_DB_PASSWORD : 'password',
        connectTimeout: (process.env.DB_TIMEOUT !== undefined) ? process.env.DB_TIMEOUT : 20000,
        connectionLimit: (process.env.DB_CONNECTION_LIMIT !== undefined) ? process.env.DB_CONNECTION_LIMIT : 20,
        rowsAsArray: (process.env.DB_OUTPUT_IS_ARRAY !== undefined) ?
        process.env.DB_OUTPUT_IS_ARRAY : true,
        timezone: (process.env.DB_TIMEZONE !== undefined) ? process.env.DB_TIMEZONE : 'local',
        dateStrings: true,
        SuspicionTypes: {
            'OverPay': 1,
            'WrongPrice': 2,
            'DuplicateTransactions': 3,
            'SuspicionTransactions': 4,
            ScannedTypes: ['SuspicionTransactionCheck.js']
        }
    },
/*
Warehouse CONFIGURATION
*/
    DW: {
        host: (process.env.DW_DB_HOST) ?  process.env.DW_DB_HOST : 'ssrs3.vn',
        port: (process.env.DW_DB_PORT) ?  process.env.DW_DB_PORT : '3306',
        database: (process.env.DW_DB) ?  process.env.DW_DB : 'ssrs_warehouse_dev',
        user: (process.env.DW_DB_USER) ?  process.env.DW_DB_USER : 'hungbv2',
        password: (process.env.DW_DB_PASSWORD) ?  process.env.DW_DB_PASSWORD : 'password',
        connectTimeout: (process.env.DB_TIMEOUT !== undefined) ? process.env.DB_TIMEOUT : 20000,
        connectionLimit: (process.env.DB_CONNECTION_LIMIT !== undefined) ? process.env.DB_CONNECTION_LIMIT : 20,
        rowsAsArray: (process.env.DB_OUTPUT_IS_ARRAY !== undefined) ?
        process.env.DB_OUTPUT_IS_ARRAY : true,
        timezone: (process.env.DB_TIMEZONE !== undefined) ? process.env.DB_TIMEZONE : 'local',
        dateStrings: true
    },
/*
Email DB CONFIGURATION
*/
    EMAIL_DB: {
        server: (process.env.EMAIL_DB_HOST) ?  process.env.EMAIL_DB_HOST : 'emailhost',
        port: (process.env.EMAIL_DB_PORT) ?  process.env.EMAIL_DB_PORT : 1433,
        database: (process.env.EMAIL_DB) ?  process.env.EMAIL_DB : 'SSRSTransactionDevTest',
        user: (process.env.EMAIL_DB_USER) ?  process.env.EMAIL_DB_USER : 'dev',
        password: (process.env.EMAIL_DB_PASSWORD) ?  process.env.EMAIL_DB_PASSWORD : 'password',
        connectTimeout: (process.env.DB_TIMEOUT !== undefined) ? process.env.DB_TIMEOUT : 20000,
        SSRSEmails: {
            tableName: 'SSRSEmails',
            columns: 'Id, tieu_de, noi_dung, nguoi_gui, nguoi_nhan, thoi_gian_gui, trang_thai' 
            + ', CreatedAt, CreatedBy'
        }

    },
/*
JOB HISTORY TABLE
*/
    FDS_TABLE: {
        tableName: (process.env.FDS_TABLE_NAME) ? process.env.FDS_TABLE_NAME : 'SuspicionOrders',
        // thu' tu. cua column khong nen thay doi
        columns: (process.env.FDS_TABLE_COLUMNS) ? process.env.FDS_TABLE_COLUMNS 
        : 'JobName,StartTime,FinishTime,DataFrom,DataTo,JobStatus',
        jobStatus: ['RUN', 'DONE']
    },

/*
    Suspicion order props
*/
    SuspicionOrders: {
        tableName: 'SuspicionOrders',
        columns: 'OrderId, AppCodeId, MarketCodeId, OrderStatusId, CreatedAtId, UpdateAtId,' + 
        'OrderCode, TongTienChuaThanhToan, TongTienDaThanhToan, TongTienPhaiThu,'+
        'TongTienThanhToan,GiaBanLucDau,PhanTram, SuspicionTypeId'
    },
/*
    Fact Orders props
*/
    FactOrders: {
        tableName: 'FactOrders',
        statusOrderOk: 4,
        columnInsert:'OrderId, AppCodeId, MarketCodeId, OrderStatusId, CreatedAtId, UpdateAtId,' + 
        'OrderCode, TongTienChuaThanhToan, TongTienDaThanhToan, TongTienPhaiThu,'+
        'TongTienThanhToan, SuspicionTypeId',
        columns: 'Id, AppCodeId, MarketCodeId, OrderStatusId, CreatedAtId, UpdateAtId,' + 
        'OrderCode, TongTienChuaThanhToan, TongTienDaThanhToan, TongTienPhaiThu,'+
        'TongTienThanhToan'
    },
    
 /*
    Fact Orders Detail props
*/
    FactOrderDetails: {
        tableName: 'FactOrderDetails',
        columnselect: 'OrderId,FactOrderDetails.AppCode, FactOrderDetails.MarketCode, OrderCode,SoTienDaNop,'+
        'FactOrderDetails.GiaBanSauKhuyenMai',
        columnInsert:'OrderId, AppCodeId, MarketCodeId,' + 
        'OrderCode, TongTienDaThanhToan, TongTienPhaiThu,'+
        'GiaBanLucDau,PhanTram, SuspicionTypeId',
        columns: 'Id, AppCode, MarketCode, OrderId, ' + 
        'OrderCode, PackageId, ParentOrderDetailId, LoaiHinhThuc,'+
        'SoTienDaNop, SoTienNopHienTai,GiaBanSauKhuyenMai'
    },

     /*
    Dim Package Prices props
    */
    DimPackagePrices: {
        tableName: 'DimPackagePrices',
        columns: 'PackageId, LoaiHinhThuc, GiaBanChuaTruKhuyenMai'
    },

 /*
    Fact Tr props
*/
    FactTransactions: {
        tableName: 'FactTransactions',
        columnInsert:'OrderId, AppCodeId, MarketCodeId, CreatedAtId,' + 
        'OrderCode, TongTienDaThanhToan, TongTienPhaiThu,'+
        'PaymentTypeId,PgTransactionStatusId,TransactionStatusId, SuspicionTypeId',
        columnselect:'OrderId, AppCode, MarketCode, CreatedAtId,'+
        'OrderCode, ActualReceivedMoney, MoneyMustReceived, '+
        'PaymentTypeId,PgTransactionStatusId, TransactionStatusId',
        columns: 'RawTransactionId, AppCode, MarketCode, PaymentTypeId, TypeOfTransactionsId, CreatedAtId,'+
        'OrderId, PaymentTIme, PaymentContent, OrderCode, GroupCode, Bank, ActualReceivedMoney, MoneyMustReceived '+
        'Balance, PaymentTypeId, SoHoaDon,TransactionStatusId,PgTransactionStatusId'
    },     
/**
 * Time interval to run
 */
    checkIntervalInMin: 2,
    loginSessionTimes: 50,
/**
 * mot so method chuan hoa tra ve
 */
    suscessResponse: function(msg) {
        return {OK : {
            msg: msg
        }}
    },
    failureResponse: function(msg) {
        console.error(msg)
        return {
            error: {
                msg: msg
            }
        }
    }
}