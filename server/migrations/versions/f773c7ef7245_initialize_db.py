"""initialize db

Revision ID: f773c7ef7245
Revises: 
Create Date: 2023-12-31 15:13:26.189316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f773c7ef7245'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('following', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('followers', sa.ARRAY(sa.String()), nullable=True),
    sa.Column('profile_pic', sa.String(), nullable=True),
    sa.Column('display_name', sa.String(), nullable=False),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('catchphrase', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('upvotes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('post_type', sa.Integer(), nullable=True),
    sa.Column('media', sa.Text(), nullable=True),
    sa.Column('caption', sa.String(), nullable=True),
    sa.Column('likes', sa.Text(), nullable=True),
    sa.Column('created', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_posts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)

    op.create_table('post_comments',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('post_id', sa.UUID(), nullable=False),
    sa.Column('comment_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], name=op.f('fk_post_comments_comment_id_comments')),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name=op.f('fk_post_comments_post_id_posts')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('post_comments')
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))

    op.drop_table('posts')
    op.drop_table('comments')
    op.drop_table('users')
    # ### end Alembic commands ###