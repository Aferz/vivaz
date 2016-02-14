set -e
echo "Enter release version: "
read VERSION

read -p "Version $VERSION is gonna be released - are you sure ? (y/n)" -n 1 -r
echo 
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Releasing version $VERSION ..."

    # Checkout master branch
    git checkout master

    # Test
    echo "Building and executing UNIT TESTS ..."
    npm run test-dev
    echo "Done."

    # Build & Bump
    echo "Bumping main file and building minified / common file ..."
    VERSION=$VERSION npm run build
    echo "Done."

    # Commit
    echo "Commiting and bumping package.json ..."
    git add -A
    git commit -m "Build $VERSION"
    npm version $VERSION --message "Build $VERSION"
    echo "Done."

    # Publish
    echo "Publishing new release ..."
    git push origin refs/tags/v$VERSION
    git push
    npm publish
    echo "Done."
fi
