# OFF_BY_ONE

## Definition

OFF_BY_ONE là lỗi sai lệch đúng một đơn vị trong chỉ số, số lần lặp, số lượng phần tử hoặc giới hạn.

Lỗi thường xảy ra khi lập trình viên nhầm giữa:

* `<` và `<=`
* `>` và `>=`
* index bắt đầu từ 0 hoặc 1
* số lượng phần tử và index cuối cùng
* khoảng `[l, r]` và `[l, r)`

## Common Patterns

### 1. Array index

Sai:

```cpp
for (int i = 0; i <= n; i++) {
    cout << a[i];
}
```

Nếu mảng có `n` phần tử thì index hợp lệ là:

```text
0 ... n-1
```

Do đó `i <= n` khiến chương trình truy cập `a[n]`.

Đúng:

```cpp
for (int i = 0; i < n; i++) {
    cout << a[i];
}
```

### 2. Loop chạy dư một lần

Sai:

```cpp
for (int i = 1; i <= n + 1; i++) {
    ...
}
```

Nếu cần thực hiện đúng `n` lần thì vòng lặp này chạy `n + 1` lần.

### 3. Loop chạy thiếu một lần

Sai:

```cpp
for (int i = 1; i < n; i++) {
    ...
}
```

Nếu cần xử lý các giá trị từ `1` đến `n` thì `n` bị bỏ qua.

Đúng:

```cpp
for (int i = 1; i <= n; i++) {
    ...
}
```

## Symptoms

* Array index vượt quá giới hạn.
* Vòng lặp chạy dư hoặc thiếu đúng một lần.
* Một phần tử đầu hoặc cuối không được xử lý.
* Kết quả sai ở các test có kích thước nhỏ hoặc tại boundary.

## How to Identify

Chọn OFF_BY_ONE khi nguyên nhân trực tiếp là sai lệch đúng một đơn vị trong index, count hoặc loop bound.

Không chọn OFF_BY_ONE nếu vấn đề chính là điều kiện logic của vòng lặp hoàn toàn sai.

## Distinction

### OFF_BY_ONE vs LOOP_CONDITION

Nếu điều kiện sai vì `<` phải là `<=`, hoặc ngược lại, và hậu quả chính là dư/thiếu đúng một lần, có thể xem là OFF_BY_ONE.

Nếu điều kiện vòng lặp biểu diễn sai logic, không liên quan đến sai lệch một đơn vị, ưu tiên LOOP_CONDITION.

### OFF_BY_ONE vs EDGE_CASE

Nếu code sai do giới hạn index/count bị lệch một đơn vị → OFF_BY_ONE.

Nếu thuật toán nhìn chung đúng nhưng thất bại ở một trường hợp đặc biệt → EDGE_CASE.

## Typical Keywords

* `i <= n`
* `i < n`
* `i++`
* `n + 1`
* `n - 1`
* first element
* last element
* index
* count
* range
* boundary
