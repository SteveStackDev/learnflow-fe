# WRONG_SORT_ORDER

## Definition

WRONG_SORT_ORDER là lỗi sử dụng thứ tự sắp xếp hoặc comparator không phù hợp với yêu cầu của bài toán.

Thuật toán có thể đúng nếu dữ liệu được sắp xếp theo đúng thứ tự, nhưng code sử dụng ascending thay vì descending hoặc ngược lại.

## Common Patterns

### 1. Ascending vs Descending

Sai:

```cpp
sort(a.begin(), a.end());
```

khi bài toán yêu cầu thứ tự giảm dần.

Đúng:

```cpp
sort(a.rbegin(), a.rend());
```

### 2. Wrong Comparator

Sai:

```cpp
sort(a.begin(), a.end(), [](int x, int y) {
    return x < y;
});
```

khi thuật toán yêu cầu phần tử lớn hơn đứng trước.

### 3. Sorting by Wrong Property

Ví dụ có:

```cpp
struct Item {
    int value;
    int cost;
};
```

nhưng code sort theo `value` trong khi greedy algorithm yêu cầu sort theo `cost`.

## Symptoms

* Kết quả sai dù các phép tính riêng lẻ đúng.
* Greedy algorithm thất bại vì chọn phần tử theo thứ tự sai.
* Test nhỏ có thể vô tình đúng.
* Thay đổi thứ tự dữ liệu đầu vào làm kết quả thay đổi bất thường.

## How to Identify

Chọn WRONG_SORT_ORDER khi nguyên nhân trực tiếp là thứ tự hoặc tiêu chí sorting không phù hợp với thuật toán.

## Distinction

### WRONG_SORT_ORDER vs GREEDY_LOGIC_ERROR

Nếu greedy strategy đúng nhưng dữ liệu được sắp xếp sai → WRONG_SORT_ORDER.

Nếu thứ tự sort đúng nhưng bản thân lựa chọn greedy sai → GREEDY_LOGIC_ERROR.

### WRONG_SORT_ORDER vs WRONG_FORMULA

Nếu phép tính cuối cùng đúng nhưng input được xử lý theo thứ tự sai → WRONG_SORT_ORDER.

## Typical Keywords

* `sort`
* `stable_sort`
* comparator
* ascending
* descending
* `less`
* `greater`
* ordering
* greedy
* ranking
