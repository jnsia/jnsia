    package com.jnsia.post.serviceImpl;

    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);

            String[] line = sc.nextLine().split(" ");

            int m = Integer.parseInt(line[0]);
            int n = Integer.parseInt(line[1]);

            String[] chess = new String[m];

            for (int i = 0; i < m; i++) {
                chess[i] = sc.nextLine();
            }

            int answer = 64;

            for (int i = 0; i < m - 7; i++) {
                for (int j = 0; j < n - 7; j++) {
                    int result = 0;
                    char prev = 'W';

                    for (int k = i; k < i + 8; k++) {
                        if (prev == 'W') {
                            prev = 'B';
                        } else if (prev == 'B') {
                            prev = 'W';
                        }

                        for (int l = j; l < j + 8; l++) {
                            if (chess[k].charAt(l) == prev) {
                                result++;
                            }

                            if (prev == 'W') {
                                prev = 'B';
                            } else if (prev == 'B') {
                                prev = 'W';
                            }
                        }
                    }

                    result = Math.min(result, 64 - result);
                    answer = Math.min(answer, result);
                }
            }

            System.out.println(answer);
        }

    }
