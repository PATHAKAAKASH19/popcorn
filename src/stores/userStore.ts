import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { AddMovieProps } from "@/types/movies";

type MovieListProps = {
  watched: AddMovieProps[];
  bookmark: AddMovieProps[];
};


type UserProps = {
  userMovieList: MovieListProps;
  addMovie: (movieObj: AddMovieProps, type: "bookmark" | "watched") => void;
  deleteMovie: (movieId: string, type: "bookmark" | "watched") => void;
  deleteAll: (type: "bookmark" | "watched") => void;
};

const useUser = create<UserProps>()(
  devtools(
    persist(
      (set) => ({
        userMovieList: {
          watched: [],
          bookmark: [],
        },

        addMovie: (movieObj, type) => {
          set((state: UserProps) => {
            if (type === "bookmark") {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  bookmark: [...state.userMovieList.bookmark, movieObj],
                },
              };
            } else {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  watched: [...state.userMovieList.watched, movieObj],
                },
              };
            }
          });
        },

        deleteMovie: (id, type) => {
          set((state: UserProps) => {
            if (type === "bookmark") {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  bookmark: state.userMovieList.bookmark.filter(
                    (obj: AddMovieProps) => obj.id !== id
                  ),
                },
              };
            } else {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  watched: state.userMovieList.watched.filter(
                    (obj: AddMovieProps) => obj.id !== id
                  ),
                },
              };
            }
          });
        },

        deleteAll: (type) => {
          set((state: UserProps) => {
            if (type === "bookmark") {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  bookmark: []
                }
              }
            } else {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  watched: []
                }
              }
            }
          })
        },
      }),
      { name: "userDataStore" }
    )
  )
);

export default useUser;
