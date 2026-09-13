# INTEGER_OVERFLOW

## Definition

INTEGER_OVERFLOW xảy ra khi kết quả tính toán vượt quá phạm vi biểu diễn của kiểu dữ liệu số nguyên đang được sử dụng.

Trong C++, các kiểu thường gặp:

```text
int      ≈ -2.1e9 đến 2.1e9
long long ≈ -9.2e18 đến 9.2e18
```

Khi giá trị vượt quá giới hạn, kết quả có thể trở thành giá trị không mong muốn.

## Common Patterns

### 1. Multiplication Overflow

Sai:

```cpp
int a = 100000;
int b = 100000;

int result = a * b;
```

`100000 * 100000 = 10^10`, vượt phạm vi của `int`.

Đúng:

```cpp
long long result = 1LL * a * b;
```

### 2. Sum Overflow

Sai:

```cpp
int sum = 0;

for (int x : a) {
    sum += x;
}
```

Nếu tổng có thể lớn hơn giới hạn `int`, cần sử dụng:

```cpp
long long sum = 0;
```

### 3. Intermediate Overflow

Ngay cả khi biến kết quả là `long long`, phép tính trung gian vẫn có thể overflow.

Sai:

```cpp
long long result = a * b;
```

nếu `a` và `b` đều là `int` và `a * b` overflow trước khi được gán cho `result`.

Đúng:

```cpp
long long result = 1LL * a * b;
```

## Symptoms

* Code đúng với số nhỏ nhưng sai với số lớn.
* Chỉ sai ở test có giá trị lớn.
* Kết quả âm hoặc rất bất thường.
* Arithmetic expression cho kết quả không hợp lý.
* Sai trong multiplication, summation, exponentiation hoặc combinatorics.

## How to Identify

Chọn INTEGER_OVERFLOW khi thuật toán hoặc công thức về mặt logic có thể đúng nhưng kiểu dữ liệu không đủ để biểu diễn giá trị trung gian hoặc kết quả.

## Distinction

### INTEGER_OVERFLOW vs WRONG_FORMULA

Nếu công thức đúng nhưng kiểu dữ liệu làm kết quả sai → INTEGER_OVERFLOW.

Nếu dùng kiểu dữ liệu đủ lớn nhưng bản thân công thức sai → WRONG_FORMULA.

### INTEGER_OVERFLOW vs EDGE_CASE

Nếu chỉ thất bại khi giá trị lớn vượt giới hạn kiểu dữ liệu → INTEGER_OVERFLOW.

## Typical Keywords

* `int`
* `long long`
* `1LL`
* multiplication
* sum
* product
* large values
* `10^9`
* `10^18`
* overflow
* intermediate result
