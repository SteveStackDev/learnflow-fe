# LOOP_CONDITION

## Definition

LOOP_CONDITION là lỗi trong logic của điều kiện quyết định vòng lặp tiếp tục hay dừng.

Lỗi này không nhất thiết liên quan đến việc lệch đúng một đơn vị.

## Common Patterns

### 1. Wrong Logical Condition

Sai:

```cpp
while (x > 0 && y > 0) {
    ...
}
```

trong khi thuật toán cần tiếp tục miễn là ít nhất một trong hai giá trị còn dương:

```cpp
while (x > 0 || y > 0) {
    ...
}
```

### 2. Wrong Comparison

Sai:

```cpp
while (x != target) {
    ...
}
```

khi `x` có thể vượt qua `target` mà không bao giờ bằng nó.

Điều kiện phù hợp có thể là:

```cpp
while (x < target) {
    ...
}
```

### 3. Loop Never Terminates

Ví dụ:

```cpp
while (i < n) {
    ...
}
```

nhưng không có thao tác làm thay đổi `i`.

Điều này có thể khiến vòng lặp chạy vô hạn.

### 4. Loop Terminates Too Early

Sai:

```cpp
while (condition && flag) {
    ...
}
```

khi `flag` có thể false trước khi thuật toán hoàn thành.

## Symptoms

* Infinite loop.
* Vòng lặp kết thúc quá sớm.
* Vòng lặp tiếp tục khi không nên.
* Một phần dữ liệu không được xử lý.
* Code hoạt động trên một số input nhưng không hoạt động trên input khác.

## How to Identify

Chọn LOOP_CONDITION khi lỗi chính nằm ở logic của biểu thức điều kiện vòng lặp.

## Distinction

### LOOP_CONDITION vs OFF_BY_ONE

Nếu lỗi là `i < n` thay vì `i <= n` và hậu quả chính là dư/thiếu đúng một lần → OFF_BY_ONE.

Nếu điều kiện logic tổng quát bị sai, ví dụ `&&` thay vì `||`, hoặc điều kiện dừng không phù hợp → LOOP_CONDITION.

### LOOP_CONDITION vs MISSING_UPDATE

Nếu vòng lặp có điều kiện đúng nhưng biến điều khiển không được cập nhật → MISSING_UPDATE.

Nếu điều kiện itself sai → LOOP_CONDITION.

## Typical Keywords

* `while`
* `for`
* `do while`
* `&&`
* `||`
* `<`
* `>`
* `==`
* `!=`
* termination
* infinite loop
* stop condition
