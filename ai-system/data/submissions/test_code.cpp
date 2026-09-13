#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int N;
    long long T;
    cin >> N >> T;
    vector<long long> a(N);
    for (int i = 0; i < N; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    long long sum = 0;
    int ans = 0;
    for (int i = 0; i < N; i++) {
        if (sum + a[i] > T)
            break;
        sum += a[i];
    }
    cout << ans << '\n';
    return 0;
}