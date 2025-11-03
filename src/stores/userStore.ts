import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type MovieProps = {
  id: string;
  poster_path: string;
  mediaType: string;
  name: string;
};

type MovieListProps = {
  watched: MovieProps[];
  bookmark: MovieProps[];
};


type UserProps = {
    userMovieList: MovieListProps;
    addMovie: (movieObj: MovieProps, type: "bookmark" | "watched") => void;
    deleteMovie: (movieId: string, type: "bookmark" | "watched") => void;
    deleteAll: (type: "bookmark"|"watched") => void;
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
                    (obj: MovieProps) => obj.id !== id
                  ),
                },
              };
            } else {
              return {
                userMovieList: {
                  ...state.userMovieList,
                  watched: state.userMovieList.watched.filter(
                    (obj: MovieProps) => obj.id !== id
                  ),
                },
              };
            }
          });
        },

        deleteAll: (type) => {
            set((state:UserProps) => {
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
                            watched:[]
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
