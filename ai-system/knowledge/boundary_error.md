# BOUNDARY_ERROR

## Definition

BOUNDARY_ERROR là lỗi xác định hoặc xử lý sai giới hạn của một miền giá trị, khoảng tìm kiếm hoặc invariant.

Lỗi thường xuất hiện trong:

* Binary search
* Two pointers
* Sliding window
* Range processing
* Interval problems
* Prefix/suffix ranges

BOUNDARY_ERROR tập trung vào việc xác định sai miền hợp lệ hoặc điều kiện biên của thuật toán.

## Common Patterns

### 1. Binary Search

Sai:

```cpp
int l = 0, r = n;

while (l < r) {
    int mid = (l + r) / 2;

    if (a[mid] < x)
        l = mid + 1;
    else
        r = mid;
}
```

Nếu thuật toán đang sử dụng một invariant khác với khoảng `[0, n]`, việc khởi tạo `r = n` có thể làm miền tìm kiếm không nhất quán với index hợp lệ.

Cần xác định rõ search space trước khi viết binary search.

### 2. Wrong Search Range

Ví dụ cần tìm đáp án trong:

```text
[1, n]
```

nhưng code chỉ xét:

```text
[0, n-1]
```

hoặc ngược lại.

### 3. Two Pointers

Sai:

```cpp
while (right <= n) {
    ...
}
```

khi `right` biểu diễn index của phần tử cuối và mảng chỉ có index từ `0` đến `n-1`.

## Symptoms

* Binary search bỏ sót đáp án.
* Thuật toán đúng với phần lớn input nhưng sai tại giới hạn.
* Không xét giá trị nhỏ nhất hoặc lớn nhất.
* Search space bị thu hẹp sai.
* Infinite loop trong binary search hoặc two pointers.
* Kết quả phụ thuộc mạnh vào min/max input.

## How to Identify

Chọn BOUNDARY_ERROR khi lỗi chính nằm ở việc xác định miền hợp lệ, search space hoặc invariant của thuật toán.

## Distinction

### BOUNDARY_ERROR vs OFF_BY_ONE

Nếu chỉ đơn giản là lệch đúng một index hoặc một lần lặp → OFF_BY_ONE.

Nếu lỗi liên quan đến việc xác định toàn bộ search space, interval hoặc invariant → BOUNDARY_ERROR.

### BOUNDARY_ERROR vs EDGE_CASE

Nếu thuật toán sử dụng sai giới hạn hoặc miền giá trị → BOUNDARY_ERROR.

Nếu thuật toán chính xác nhưng không xử lý một trường hợp đặc biệt → EDGE_CASE.

## Typical Keywords

* `l`
* `r`
* `left`
* `right`
* `mid`
* `low`
* `high`
* binary search
* range
* interval
* search space
* invariant
* minimum
* maximum
