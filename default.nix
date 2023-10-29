with import <nixpkgs> {};
  
    stdenv.mkDerivation {
      name = "my_prog";
      src = ./.;
      
      buildInputs = [
       nodejs
       nodePackages.typescript-language-server
       mongodb-compass
      ];
      
   }
