    package com.jnsia.post.serviceImpl;

    import java.util.*;

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);

            int N = sc.nextInt();

            Set<String> set = new HashSet<>();
            List<String> arr = new ArrayList<>();

            for (int i = 0; i < N; i++) {
                String input = sc.next();
                set.add(input);
            }

            for (String string: set) {
                arr.add(string);
            }

            for (int i = 0; i < arr.size() - 1; i++) {
                for (int j = i + 1; j < arr.size(); j++) {
                    if (arr.get(i).length() > arr.get(j).length()) {
                        String temp = arr.get(i);
                        arr.set(i, arr.get(j));
                        arr.set(j, temp);
                    } else if (arr.get(i).length() == arr.get(j).length()) {
                        if (arr.get(i).compareTo(arr.get(j)) == 1) {
                            String temp = arr.get(i);
                            arr.set(i, arr.get(j));
                            arr.set(j, temp);
                        }
                    }
                }
            }

            for (int i = 0; i < arr.size(); i++) {
                System.out.println(arr.get(i));
            }
        }
    }
