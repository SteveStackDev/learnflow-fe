# GREEDY_LOGIC_ERROR

## Definition

GREEDY_LOGIC_ERROR là lỗi trong chiến lược greedy, khi chương trình đưa ra một lựa chọn cục bộ không đảm bảo dẫn đến lời giải tối ưu hoặc đúng.

Greedy algorithm thường:

1. Xác định lựa chọn tốt nhất tại thời điểm hiện tại.
2. Chọn nó.
3. Không quay lại thay đổi lựa chọn trước đó.

Nếu tiêu chí lựa chọn không đúng, thuật toán có thể cho kết quả sai.

## Common Patterns

### 1. Wrong Local Choice

Ví dụ bài toán yêu cầu chọn các khoảng thời gian để tối đa số lượng hoạt động.

Một greedy strategy đúng có thể là chọn activity kết thúc sớm nhất.

Nếu code chọn activity bắt đầu sớm nhất:

```cpp
sort(a.begin(), a.end(), compareStart);
```

thì chiến lược có thể sai.

### 2. Greedy Without Proof

Code luôn chọn phần tử lớn nhất:

```cpp
while (...) {
    chooseLargest();
}
```

nhưng bài toán không có tính chất cho phép lựa chọn lớn nhất ở mỗi bước.

### 3. Incorrect Selection Criterion

Ví dụ:

```text
Chọn item có value lớn nhất
```

trong khi greedy đúng phải:

```text
Chọn item có value / cost lớn nhất
```

## Symptoms

* Thuật toán đúng với nhiều test nhưng sai với một số cấu hình cụ thể.
* Một lựa chọn ban đầu khiến các lựa chọn sau không còn tối ưu.
* Dynamic programming hoặc brute force cho kết quả tốt hơn.
* Sorting có thể đúng nhưng tiêu chí lựa chọn sau sorting vẫn sai.

## How to Identify

Chọn GREEDY_LOGIC_ERROR khi chiến lược lựa chọn cục bộ là nguyên nhân chính gây sai.

## Distinction

### GREEDY_LOGIC_ERROR vs WRONG_SORT_ORDER

Nếu comparator hoặc thứ tự sorting sai → WRONG_SORT_ORDER.

Nếu sorting đúng nhưng chương trình chọn phần tử theo chiến lược greedy sai → GREEDY_LOGIC_ERROR.

### GREEDY_LOGIC_ERROR vs WRONG_FORMULA

Nếu chiến lược lựa chọn sai → GREEDY_LOGIC_ERROR.

Nếu chiến lược đúng nhưng phép tính kết quả sai → WRONG_FORMULA.

### GREEDY_LOGIC_ERROR vs EDGE_CASE

Nếu greedy strategy không đúng về mặt thuật toán → GREEDY_LOGIC_ERROR.

Nếu strategy đúng nhưng một trường hợp đặc biệt chưa được xử lý → EDGE_CASE.

## Typical Keywords

* greedy
* local choice
* optimal choice
* selection
* priority
* maximize
* minimize
* strategy
* optimal
* exchange argument
