#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    long long t;
    cin >> n >> t;

    vector<long long> a(n);

    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    sort(a.begin(), a.end(), [](long long x, long long y) { return x >= y; });

    long long sum = 0;
    int count = 0;

    for (int i = 0; i < n; ++i) {
        if (sum + a[i] <= t) {
            sum += a[i];
            ++count;
        } else {
            break;
        }
    }

    cout << count << '\n';

    return 0;
}
