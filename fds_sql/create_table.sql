CREATE DATABASE fds
    CHARACTER SET = 'utf8mb4'
    COLLATE = 'utf8mb4_general_ci';
USE fds;


CREATE TABLE SuspicionOrders (
    OrderId INT UNSIGNED,
    AppCodeId VARCHAR(5),
    MarketCodeId VARCHAR(5),
    OrderStatusId TINYINT UNSIGNED,
    SuspicionTypeId TINYINT UNSIGNED,
    CreatedAtId VARCHAR(12),
    UpdateAtId VARCHAR(12),
    OrderCode VARCHAR(10),
    TongTienChuaThanhToan DECIMAL(18, 2),
    TongTienDaThanhToan DECIMAL(18, 2),
    TongTienPhaiThu DECIMAL(18, 2),
    TongTienThanhToan DECIMAL(18, 2),
    PRIMARY KEY (OrderId, AppCodeId, MarketCodeId)
);

CREATE TABLE SuspicionTypes (
    Id TINYINT UNSIGNED AUTO_INCREMENT,
    MoTa VARCHAR(255),
    PRIMARY KEY(Id)
);

INSERT INTO SuspicionTypes (Mota) VALUES ('Đơn hàng được ghi nhận thừa tiền');
INSERT INTO SuspicionTypes (Mota) VALUES ('Sản phẩm bị bán sai chính sách giá');
INSERT INTO SuspicionTypes (Mota) VALUES ('Giao dịch bị ghi nhận nhiều lần');
INSERT INTO SuspicionTypes (Mota) VALUES ('Giao dịch có dấu hiệu gian lận');

ALTER TABLE SuspicionOrders ADD CONSTRAINT FK_SuspicionType FOREIGN KEY (SuspicionTypeId) 
REFERENCES SuspicionTypes(Id);